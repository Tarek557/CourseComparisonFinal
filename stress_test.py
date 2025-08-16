#!/usr/bin/env python3
"""
Stress test for backend API to verify stability after major frontend updates
"""

import requests
import time
import concurrent.futures
import statistics

BACKEND_URL = "https://studychoice.preview.emergentagent.com/api"

def make_request(endpoint):
    """Make a single request to the backend"""
    try:
        start_time = time.time()
        response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=10)
        end_time = time.time()
        
        return {
            "success": response.status_code == 200,
            "response_time": end_time - start_time,
            "status_code": response.status_code,
            "endpoint": endpoint
        }
    except Exception as e:
        return {
            "success": False,
            "response_time": 0,
            "status_code": 0,
            "endpoint": endpoint,
            "error": str(e)
        }

def run_stress_test():
    """Run concurrent stress test"""
    print("🔥 Running Backend Stress Test...")
    print("=" * 50)
    
    # Test endpoints
    endpoints = ["/", "/health", "/universities"]
    
    # Create concurrent requests
    requests_per_endpoint = 10
    total_requests = len(endpoints) * requests_per_endpoint
    
    print(f"Making {total_requests} concurrent requests...")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        # Submit all requests
        futures = []
        for endpoint in endpoints:
            for _ in range(requests_per_endpoint):
                future = executor.submit(make_request, endpoint)
                futures.append(future)
        
        # Collect results
        results = []
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())
    
    # Analyze results
    successful_requests = [r for r in results if r["success"]]
    failed_requests = [r for r in results if not r["success"]]
    
    if successful_requests:
        response_times = [r["response_time"] for r in successful_requests]
        avg_response_time = statistics.mean(response_times)
        median_response_time = statistics.median(response_times)
        max_response_time = max(response_times)
        min_response_time = min(response_times)
    else:
        avg_response_time = median_response_time = max_response_time = min_response_time = 0
    
    # Print results
    print(f"\n📊 STRESS TEST RESULTS")
    print("=" * 50)
    print(f"Total Requests: {total_requests}")
    print(f"Successful: {len(successful_requests)}")
    print(f"Failed: {len(failed_requests)}")
    print(f"Success Rate: {(len(successful_requests)/total_requests)*100:.1f}%")
    
    if successful_requests:
        print(f"\n⏱️  RESPONSE TIMES:")
        print(f"Average: {avg_response_time:.3f}s")
        print(f"Median: {median_response_time:.3f}s")
        print(f"Min: {min_response_time:.3f}s")
        print(f"Max: {max_response_time:.3f}s")
    
    if failed_requests:
        print(f"\n❌ FAILED REQUESTS:")
        for req in failed_requests[:5]:  # Show first 5 failures
            error_msg = req.get('error', f'HTTP {req["status_code"]}')
            print(f"  - {req['endpoint']}: {error_msg}")
    
    # Determine if test passed
    success_rate = (len(successful_requests)/total_requests)*100
    performance_good = avg_response_time < 2.0 if successful_requests else False
    
    if success_rate >= 95 and performance_good:
        print(f"\n✅ STRESS TEST PASSED")
        return True
    else:
        print(f"\n❌ STRESS TEST FAILED")
        return False

if __name__ == "__main__":
    run_stress_test()