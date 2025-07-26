import os
import json

from pymongo import MongoClient

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        user_id = event.get("userId")
        
        if not user_id:
            raise ValueError('User ID is required')
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["users"]
        
        user = collection.find_one({"id": user_id})
        
        if not user:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'User not found'})
            }
        
        return {
            'statusCode': 200,
            'body': json.dumps({'user': user})
        }
        
    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
    finally:
        if 'client' in locals():
            client.close()