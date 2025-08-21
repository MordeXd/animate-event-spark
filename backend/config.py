import os

class Config:
    # MongoDB URI (replace with your actual URI)
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/eventDB")
