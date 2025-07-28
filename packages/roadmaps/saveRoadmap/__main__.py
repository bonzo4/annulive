import os
import json
from datetime import datetime

from pymongo import MongoClient
from util.parse import parse, validate_roadmap_data
from util.auth import validate_api_key_auth

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        validate_api_key_auth(event)
        
        roadmap_data = parse(event)
        
        validation_error = validate_roadmap_data(roadmap_data)
        if validation_error:
            return validation_error
        
        roadmap = {
            'title': roadmap_data['title'],
            'steps': roadmap_data['steps'],
            'tags': roadmap_data['tags'],
            'totalTimeframe': roadmap_data['totalTimeframe'],
            'userId': roadmap_data['userId'],
            'completedSteps': [],
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        
        client = MongoClient(uri)
        db = client["app"]
        roadmaps_collection = db["roadmaps"]
        users_collection = db["users"]

        roadmaps_collection.insert_one(roadmap)

        user = users_collection.find_one({"id": roadmap_data['userId']})
        if user:
            existing_tags = user.get('tags', [])
            new_tags = [tag for tag in roadmap_data['tags'] if tag not in existing_tags]
            
            if new_tags:
                updated_tags = existing_tags + new_tags
                users_collection.update_one(
                    {"id": roadmap_data['userId']},
                    {"$set": {"tags": updated_tags}}
                )
        
        roadmap_response = roadmap.copy()
        roadmap_response['id'] = str(roadmap['_id'])
        roadmap_response['_id'] = str(roadmap['_id'])
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "ok": True,
                "roadmap": roadmap_response,
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        }
        
    except ValueError as e:
        error_message = str(e)
        if "authorization" in error_message.lower() or "token" in error_message.lower():
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Unauthorized: ' + error_message}),
                'headers': {
                    "Content-Type": "application/json"
                }
            }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': str(e)}),
                'headers': {
                    "Content-Type": "application/json"
                }
            }
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': f'Invalid JSON: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'ok': False, 'error': f'Internal error: {str(e)}'})
        }
    finally:
        if 'client' in locals():
            client.close()
