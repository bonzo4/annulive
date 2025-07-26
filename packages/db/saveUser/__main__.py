import os

from pymongo import MongoClient

uri = os.environ.get("DATABASE_URL")

def main(user_data=None):
    if not uri:
        return {
            "statusCode": 500,
            "body": {"error": "Database URL not configured"}
        }
    
    if not user_data:
        user_data = {"name": "Alonzo"}
    
    client = None
    try:
        client = MongoClient(uri)
        client["admin"].command('ping')
        
        db = client["app"]
        collection = db["users"]
        result = collection.insert_one(user_data)
        
        return { 
            "statusCode": 200,
            "body": {
                "ok": True,
                "userId": str(result.inserted_id)
            }
        }
    except Exception as e:
        print(f"Database error: {e}")
        return {
            "statusCode": 500,
            "body": {"error": f"There was a problem saving the user to the database: {str(e)}"}
        }
    finally:
        if client:
            client.close()