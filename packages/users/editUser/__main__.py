import os
import json

from pymongo import MongoClient
from util.parse import parse

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        parsed_data = parse(event)
        user_id = parsed_data['user_id']
        update_data = parsed_data['update_data']
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["users"]
        
        user = collection.find_one({"id": user_id})
        
        if not user:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'User not found'})
            }
        
        result = collection.update_one(
            {"id": user_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No changes were made'})
            }
        
        updated_user = collection.find_one({"id": user_id})
        if '_id' in updated_user:
            updated_user['_id'] = str(updated_user['_id'])
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'ok': True,
                'user': updated_user
            })
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