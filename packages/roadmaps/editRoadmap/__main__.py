import os
import json
from datetime import datetime

from pymongo import MongoClient
from bson import ObjectId
from util.parse import parse, validate_roadmap_data
from util.auth import validate_api_key_auth

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        validate_api_key_auth(event)
        
        roadmap_id, roadmap_data, user_id = parse(event)
        
        validation_error = validate_roadmap_data(roadmap_data)
        if validation_error:
            return validation_error
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        try:
            existing_roadmap = collection.find_one({"_id": ObjectId(roadmap_id)})
        except Exception:
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'Invalid roadmap ID format'})
            }
        
        if not existing_roadmap:
            return {
                'statusCode': 404,
                'body': json.dumps({'ok': False, 'error': 'Roadmap not found'})
            }
        if existing_roadmap['userId'] != user_id:
            return {
                'statusCode': 403,
                'body': json.dumps({'ok': False, 'error': 'You are not authorized to edit this roadmap'})
            }
        
        update_data = {'updatedAt': datetime.now().isoformat()}
        
        if 'title' in roadmap_data:
            update_data['title'] = roadmap_data['title']
        if 'steps' in roadmap_data:
            update_data['steps'] = roadmap_data['steps']
        if 'tags' in roadmap_data:
            update_data['tags'] = roadmap_data['tags']
        if 'totalTimeframe' in roadmap_data:
            update_data['totalTimeframe'] = roadmap_data['totalTimeframe']
        if 'completedSteps' in roadmap_data:
            update_data['completedSteps'] = roadmap_data['completedSteps']
        
        result = collection.update_one(
            {"_id": ObjectId(roadmap_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'No changes were made to the roadmap'})
            }
        
        updated_roadmap = collection.find_one({"_id": ObjectId(roadmap_id)})
        
        roadmap_response = {
            'id': str(updated_roadmap['_id']),
            'title': updated_roadmap['title'],
            'steps': updated_roadmap.get('steps', []),
            'tags': updated_roadmap.get('tags', []),
            'totalTimeframe': updated_roadmap.get('totalTimeframe', ''),
            'userId': updated_roadmap['userId'],
            'completedSteps': updated_roadmap.get('completedSteps', []),
            'createdAt': updated_roadmap['createdAt'],
            'updatedAt': updated_roadmap['updatedAt']
        }
        
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
