import os

class Config:
    CSV_FILE = os.environ.get("CSV_FILE", "registrations.csv")
