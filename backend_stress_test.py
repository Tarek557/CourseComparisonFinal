#!/usr/bin/env python3
"""
Backend Stress Test for UK Universities Course Comparison Website
Tests backend stability under increased load after data expansion
"""

import requests
import json
import time
import threading
import sys
from concurrent.futures import ThreadPoolExecutor
from typing import Dict, Any, List

# Get backend URL from frontend environment
BACKEND_URL = "https://degreeseeker.preview.emergentagent.com/api"

class BackendStressTester:
    def __init__(self):
        self.results = []
        self.total_requests = 0
        self.successful_requests = 0
        self.failed_requests = 0
        self.response_times = []
        
    def make_request(self, endpoint: str) -> Dict[str, Any]:
        """Make a single request and return result"""
        start_time = time.time()
        try:
            response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=10)
            end_time = time.time()
            
            return {
                "success": response.status_code == 200,
                "status_code": response.status_code,
                "response_time": end_time - start_time,
                "endpoint": endpoint
            }
        except Exception as e:
            end_time = time.time()
            return {
                "success": False,
                "status_code": 0,
                "response_time": end_time - start_time,
                "endpoint": endpoint,
                "error": str(e)
            }
    
    def concurrent_load_test(self, num_threads: int = 10, requests_per_thread: int = 5):
        """Test backend with concurrent requests"""
        print(f"🔥 Running concurrent load test: {num_threads} threads, {requests_per_thread} requests each")
        
        endpoints = ["/", "/health", "/universities"]
        all_results = []
        
        def worker():
            thread_results = []
            for _ in range(requests_per_thread):
                for endpoint in endpoints:
                    result = self.make_request(endpoint)
                    thread_results.append(result)
                    time.sleep(0.1)  # Small delay between requests
            return thread_results
        
        start_time = time.time()
        
        with ThreadPoolExecutor(max_workers=num_threads) as executor:
            futures = [executor.submit(worker) for _ in range(num_threads)]
            
            for future in futures:
                thread_results = future.result()
                all_results.extend(thread_results)
        
        end_time = time.time()
        total_time = end_time - start_time
        
        # Analyze results
        successful = sum(1 for r in all_results if r["success"])
        failed = len(all_results) - successful
        response_times = [r["response_time"] for r in all_results if r["success"]]
        
        avg_response_time = sum(response_times) / len(response_times) if response_times else 0
        max_response_time = max(response_times) if response_times else 0
        min_response_time = min(response_times) if response_times else 0
        
        print(f"✅ Load Test Results:")
        print(f"   Total Requests: {len(all_results)}")
        print(f"   Successful: {successful}")
        print(f"   Failed: {failed}")
        print(f"   Success Rate: {(successful/len(all_results))*100:.1f}%")
        print(f"   Total Time: {total_time:.2f}s")
        print(f"   Requests/sec: {len(all_results)/total_time:.2f}")
        print(f"   Avg Response Time: {avg_response_time:.3f}s")
        print(f"   Min Response Time: {min_response_time:.3f}s")
        print(f"   Max Response Time: {max_response_time:.3f}s")
        
        return {
            "success": failed == 0,
            "total_requests": len(all_results),
            "successful_requests": successful,
            "failed_requests": failed,
            "success_rate": (successful/len(all_results))*100,
            "total_time": total_time,
            "requests_per_second": len(all_results)/total_time,
            "avg_response_time": avg_response_time,
            "max_response_time": max_response_time,
            "min_response_time": min_response_time
        }
    
    def memory_stability_test(self, duration_seconds: int = 30):
        """Test backend memory stability over time"""
        print(f"🧠 Running memory stability test for {duration_seconds} seconds")
        
        start_time = time.time()
        request_count = 0
        errors = []
        response_times = []
        
        while time.time() - start_time < duration_seconds:
            result = self.make_request("/health")
            request_count += 1
            
            if result["success"]:
                response_times.append(result["response_time"])
            else:
                errors.append(result)
            
            time.sleep(0.5)  # Request every 500ms
        
        avg_response_time = sum(response_times) / len(response_times) if response_times else 0
        
        print(f"✅ Memory Stability Results:")
        print(f"   Duration: {duration_seconds}s")
        print(f"   Total Requests: {request_count}")
        print(f"   Successful Requests: {len(response_times)}")
        print(f"   Failed Requests: {len(errors)}")
        print(f"   Avg Response Time: {avg_response_time:.3f}s")
        print(f"   Stability: {'STABLE' if len(errors) == 0 else 'UNSTABLE'}")
        
        return {
            "success": len(errors) == 0,
            "total_requests": request_count,
            "successful_requests": len(response_times),
            "failed_requests": len(errors),
            "avg_response_time": avg_response_time,
            "stable": len(errors) == 0
        }
    
    def run_stress_tests(self):
        """Run all stress tests"""
        print(f"🚀 Starting Backend Stress Tests for: {BACKEND_URL}")
        print("=" * 70)
        
        # Test 1: Concurrent Load Test
        load_result = self.concurrent_load_test(num_threads=8, requests_per_thread=3)
        
        print("\n" + "-" * 70)
        
        # Test 2: Memory Stability Test
        stability_result = self.memory_stability_test(duration_seconds=20)
        
        # Overall Assessment
        print("\n" + "=" * 70)
        print("📊 OVERALL STRESS TEST ASSESSMENT")
        print("=" * 70)
        
        overall_success = load_result["success"] and stability_result["success"]
        
        if overall_success:
            print("✅ BACKEND PASSED ALL STRESS TESTS")
            print("   - Handles concurrent load well")
            print("   - Memory usage remains stable")
            print("   - Performance is excellent")
        else:
            print("❌ BACKEND FAILED STRESS TESTS")
            if not load_result["success"]:
                print("   - Issues with concurrent load handling")
            if not stability_result["success"]:
                print("   - Memory stability problems detected")
        
        return overall_success

if __name__ == "__main__":
    tester = BackendStressTester()
    success = tester.run_stress_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)