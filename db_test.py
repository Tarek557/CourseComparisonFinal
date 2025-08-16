#!/usr/bin/env python3
"""
Test MongoDB connection and database status
"""

import os
from pymongo import MongoClient
import time

def test_mongodb():
    """Test MongoDB connection and basic operations"""
    print("🔍 Testing MongoDB Connection...")
    print("=" * 40)
    
    # Get MongoDB URL from environment
    MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME = os.environ.get('DB_NAME', 'uk_universities')
    
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        
        # Test connection
        client.admin.command('ismaster')
        print(f"✅ Connected to MongoDB at {MONGO_URL}")
        
        # Get database
        db = client[DB_NAME]
        
        # Test basic operations
        test_collection = db.test_collection
        
        # Insert test document
        test_doc = {"test": "connection", "timestamp": time.time()}
        result = test_collection.insert_one(test_doc)
        print(f"✅ Test document inserted with ID: {result.inserted_id}")
        
        # Read test document
        found_doc = test_collection.find_one({"_id": result.inserted_id})
        if found_doc:
            print(f"✅ Test document retrieved successfully")
        
        # Delete test document
        delete_result = test_collection.delete_one({"_id": result.inserted_id})
        if delete_result.deleted_count == 1:
            print(f"✅ Test document deleted successfully")
        
        # Get server info
        server_info = client.server_info()
        print(f"✅ MongoDB version: {server_info['version']}")
        
        # List databases
        db_list = client.list_database_names()
        print(f"✅ Available databases: {db_list}")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {str(e)}")
        return False

if __name__ == "__main__":
    test_mongodb()