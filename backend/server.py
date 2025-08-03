from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from pymongo import MongoClient
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="UK Universities API", description="API for UK University Course Comparison")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'uk_universities')

try:
    client = MongoClient(MONGO_URL)
    db = client[DB_NAME]
    print(f"✅ Connected to MongoDB at {MONGO_URL}")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    db = None

@app.get("/api/")
async def root():
    """Root endpoint"""
    return {
        "message": "UK Universities Course Comparison API", 
        "status": "active",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    mongo_status = "connected" if db is not None else "disconnected"
    return {
        "status": "healthy",
        "database": mongo_status,
        "message": "UK Universities API is running"
    }

@app.get("/api/universities")
async def get_universities():
    """Get all universities data (for static website, this endpoint is optional)"""
    return {
        "message": "University data is served directly from frontend for static functionality",
        "total_universities": "12+",
        "focus_areas": ["Computer Science", "Computing", "Data Science"]
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=port,
        reload=True
    )