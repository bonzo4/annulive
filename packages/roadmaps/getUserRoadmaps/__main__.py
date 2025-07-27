import os
import json

from pymongo import MongoClient

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        
        user_id = event.get('userId')
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'userId is required'})
            }
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        data = collection.find({"userId": user_id})
        roadmaps = []
        for roadmap in data:
            roadmaps.append({
                'id': str(roadmap['_id']),
                'title': roadmap['title'],
                'steps': roadmap.get('steps', []),
                'tags': roadmap.get('tags', []),
                'totalTimeframe': roadmap.get('totalTimeframe', ''),
                'userId': roadmap['userId'],
                'completedSteps': roadmap['completedSteps'],
                'createdAt': roadmap['createdAt'],
                'updatedAt': roadmap['updatedAt']
            })

        return {
            "statusCode": 200,
            "body": json.dumps({
                "ok": True,
                "roadmaps": roadmaps,
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
