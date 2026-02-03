"""
Check data in Supabase tables
"""

import requests

SUPABASE_URL = "https://vfximbrvzkmcsupqbkgq.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGltYnJ2emttY3N1cHFia2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA2MDAyOSwiZXhwIjoyMDg1NjM2MDI5fQ.Mj4kq-SxU04-TX0QvcrXJF5vw0RGd83RsvYJlweXhEY"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json"
}

def count_records(table_name):
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=id"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return len(response.json())
    return 0

print("=" * 60)
print("SUPABASE DATA CHECK")
print("=" * 60)

tables = ['tasks', 'projects', 'ideas', 'brain', 'logs', 'system_status']

for table in tables:
    count = count_records(table)
    print(f"{table}: {count} records")

print("\n" + "=" * 60)
