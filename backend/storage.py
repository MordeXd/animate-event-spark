import csv
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

CSV_FILE = os.getenv("CSV_FILE", "registrations.csv")

def save_to_csv(data):
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=data.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)
