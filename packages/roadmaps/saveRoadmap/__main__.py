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
        
        roadmap_id = f"roadmap_{int(datetime.now().timestamp())}_{roadmap_data['userId']}"

        roadmap = {
            'id': roadmap_id,
            'title': roadmap_data['title'],
            'content': roadmap_data['content'],
            'userId': roadmap_data['userId'],
            'completedSteps': roadmap_data.get('completedSteps', []),
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat()
        }
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        collection.insert_one(roadmap)
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "ok": True,
                "roadmap": roadmap,
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
