#!/usr/bin/env python3
"""
Backend API Testing Suite for UK Universities Course Comparison Website
Tests all backend endpoints for functionality, stability, and CORS configuration
"""

import requests
import json
import time
import sys
from typing import Dict, Any

# Get backend URL from frontend environment
BACKEND_URL = "https://ukstudyguide.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_result(self, test_name: str, status: str, message: str, details: Dict[Any, Any] = None):
        """Log test result"""
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details or {}
        }
        self.results.append(result)
        self.total_tests += 1
        
        if status == "PASS":
            self.passed_tests += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.failed_tests += 1
            print(f"❌ {test_name}: {message}")
            if details:
                print(f"   Details: {details}")
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ["message", "status", "version"]
                
                if all(field in data for field in expected_fields):
                    self.log_result(
                        "Root Endpoint", 
                        "PASS", 
                        f"Root endpoint working correctly (status: {data.get('status')})",
                        {"response_data": data, "response_time": response.elapsed.total_seconds()}
                    )
                else:
                    self.log_result(
                        "Root Endpoint", 
                        "FAIL", 
                        "Missing expected fields in response",
                        {"response_data": data, "expected_fields": expected_fields}
                    )
            else:
                self.log_result(
                    "Root Endpoint", 
                    "FAIL", 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Root Endpoint", 
                "FAIL", 
                f"Request failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def test_health_check_endpoint(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ["status", "database", "message"]
                
                if all(field in data for field in expected_fields):
                    db_status = data.get("database", "unknown")
                    api_status = data.get("status", "unknown")
                    
                    self.log_result(
                        "Health Check Endpoint", 
                        "PASS", 
                        f"Health check working (API: {api_status}, DB: {db_status})",
                        {"response_data": data, "response_time": response.elapsed.total_seconds()}
                    )
                else:
                    self.log_result(
                        "Health Check Endpoint", 
                        "FAIL", 
                        "Missing expected fields in health check response",
                        {"response_data": data, "expected_fields": expected_fields}
                    )
            else:
                self.log_result(
                    "Health Check Endpoint", 
                    "FAIL", 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Health Check Endpoint", 
                "FAIL", 
                f"Request failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def test_universities_endpoint(self):
        """Test the universities endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/universities", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ["message", "total_universities", "focus_areas"]
                
                if all(field in data for field in expected_fields):
                    self.log_result(
                        "Universities Endpoint", 
                        "PASS", 
                        f"Universities endpoint working correctly",
                        {"response_data": data, "response_time": response.elapsed.total_seconds()}
                    )
                else:
                    self.log_result(
                        "Universities Endpoint", 
                        "FAIL", 
                        "Missing expected fields in universities response",
                        {"response_data": data, "expected_fields": expected_fields}
                    )
            else:
                self.log_result(
                    "Universities Endpoint", 
                    "FAIL", 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Universities Endpoint", 
                "FAIL", 
                f"Request failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def test_cors_configuration(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            headers = {
                'Origin': 'https://ukstudyguide.preview.emergentagent.com',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            
            response = requests.options(f"{BACKEND_URL}/health", headers=headers, timeout=10)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if response.status_code in [200, 204] and cors_headers['Access-Control-Allow-Origin']:
                self.log_result(
                    "CORS Configuration", 
                    "PASS", 
                    "CORS headers properly configured",
                    {"cors_headers": cors_headers, "status_code": response.status_code}
                )
            else:
                self.log_result(
                    "CORS Configuration", 
                    "FAIL", 
                    f"CORS preflight failed (status: {response.status_code})",
                    {"cors_headers": cors_headers, "status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "CORS Configuration", 
                "FAIL", 
                f"CORS test failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def test_api_performance(self):
        """Test API performance and stability"""
        try:
            response_times = []
            failed_requests = 0
            
            # Make 5 consecutive requests to test stability
            for i in range(5):
                start_time = time.time()
                response = requests.get(f"{BACKEND_URL}/health", timeout=10)
                end_time = time.time()
                
                if response.status_code == 200:
                    response_times.append(end_time - start_time)
                else:
                    failed_requests += 1
                
                time.sleep(0.5)  # Small delay between requests
            
            if failed_requests == 0:
                avg_response_time = sum(response_times) / len(response_times)
                max_response_time = max(response_times)
                
                if avg_response_time < 2.0:  # Less than 2 seconds average
                    self.log_result(
                        "API Performance", 
                        "PASS", 
                        f"API performance good (avg: {avg_response_time:.3f}s, max: {max_response_time:.3f}s)",
                        {"avg_response_time": avg_response_time, "max_response_time": max_response_time, "total_requests": 5}
                    )
                else:
                    self.log_result(
                        "API Performance", 
                        "FAIL", 
                        f"API performance slow (avg: {avg_response_time:.3f}s)",
                        {"avg_response_time": avg_response_time, "max_response_time": max_response_time}
                    )
            else:
                self.log_result(
                    "API Performance", 
                    "FAIL", 
                    f"API stability issues ({failed_requests}/5 requests failed)",
                    {"failed_requests": failed_requests, "total_requests": 5}
                )
                
        except Exception as e:
            self.log_result(
                "API Performance", 
                "FAIL", 
                f"Performance test failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def test_invalid_endpoints(self):
        """Test handling of invalid endpoints"""
        try:
            response = requests.get(f"{BACKEND_URL}/nonexistent", timeout=10)
            
            if response.status_code == 404:
                self.log_result(
                    "Invalid Endpoint Handling", 
                    "PASS", 
                    "Properly returns 404 for invalid endpoints",
                    {"status_code": response.status_code}
                )
            else:
                self.log_result(
                    "Invalid Endpoint Handling", 
                    "FAIL", 
                    f"Unexpected status code for invalid endpoint: {response.status_code}",
                    {"status_code": response.status_code, "response_text": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Invalid Endpoint Handling", 
                "FAIL", 
                f"Request failed: {str(e)}",
                {"error_type": type(e).__name__}
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for: {BACKEND_URL}")
        print("=" * 60)
        
        # Run all tests
        self.test_root_endpoint()
        self.test_health_check_endpoint()
        self.test_universities_endpoint()
        self.test_cors_configuration()
        self.test_api_performance()
        self.test_invalid_endpoints()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        
        if self.failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.results:
                if result["status"] == "FAIL":
                    print(f"  - {result['test']}: {result['message']}")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)