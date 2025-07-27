import os
import json

from pymongo import MongoClient
from bson import ObjectId

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        roadmap_id = event.get('roadmapId')
        if not roadmap_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'roadmapId is required'})
            }
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        try:
            roadmap = collection.find_one({"_id": ObjectId(roadmap_id)})
        except Exception:
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'Invalid roadmap ID format'})
            }
        
        if not roadmap:
            return {
                'statusCode': 404,
                'body': json.dumps({'ok': False, 'error': 'Roadmap not found'})
            }

        roadmap_response = {
            'id': str(roadmap['_id']),
            'title': roadmap['title'],
            'steps': roadmap.get('steps', []),
            'tags': roadmap.get('tags', []),
            'totalTimeframe': roadmap.get('totalTimeframe', ''),
            'userId': roadmap['userId'],
            'completedSteps': roadmap.get('completedSteps', []),
            'createdAt': roadmap['createdAt'],
            'updatedAt': roadmap['updatedAt']
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
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'ok': False, 'error': f'Internal error: {str(e)}'})
        }
