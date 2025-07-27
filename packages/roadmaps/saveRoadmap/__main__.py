import os
import json
from datetime import datetime

from pymongo import MongoClient
from util.parse import parse, validate_roadmap_data

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
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
            'completedSteps': roadmap_data.get('completedSteps', []),
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        collection.insert_one(roadmap)
        
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
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': str(e)})
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
