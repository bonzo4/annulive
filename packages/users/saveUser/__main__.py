import os
import json

from pymongo import MongoClient
from util.parse import parse
from util.auth import validate_api_key_auth

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        validate_api_key_auth(event)
        
        user_data = parse(event)
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["users"]
        
        collection.update_one(
            {"id": user_data['id']},
            {"$set": user_data},
            upsert=True
        )
            
        return { 
            "statusCode": 200,
            "body": json.dumps({
                "ok": True
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Invalid JSON: {str(e)}'})
        }
    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "There was a problem adding the user to the database."})
        }
    finally:
        if 'client' in locals():
            client.close()