import os
import json

from pymongo import MongoClient

uri = os.environ.get("DATABASE_URL")

def main(event):
    try:
        limit = event.get('limit', 10)
        page = event.get('page', 1)
        
        try:
            limit = int(limit)
            page = int(page)
            if limit <= 0 or limit > 100:
                limit = 10
            if page <= 0:
                page = 1
        except (ValueError, TypeError):
            return {
                'statusCode': 400,
                'body': json.dumps({'ok': False, 'error': 'Invalid limit or page parameters'})
            }
        
        skip = (page - 1) * limit
        
        client = MongoClient(uri)
        db = client["app"]
        collection = db["roadmaps"]

        total_count = collection.count_documents({})
        
        cursor = collection.find({}).sort("createdAt", -1).skip(skip).limit(limit)
        
        roadmaps = []
        for roadmap in cursor:
            roadmaps.append({
                'id': str(roadmap['_id']),
                'title': roadmap['title'],
                'steps': roadmap.get('steps', []),
                'tags': roadmap.get('tags', []),
                'totalTimeframe': roadmap.get('totalTimeframe', ''),
                'userId': roadmap['userId'],
                'completedSteps': roadmap.get('completedSteps', []),
                'createdAt': roadmap['createdAt'],
                'updatedAt': roadmap['updatedAt']
            })

        total_pages = (total_count + limit - 1) // limit
        has_next = page < total_pages
        has_prev = page > 1

        return {
            "statusCode": 200,
            "body": json.dumps({
                "ok": True,
                "roadmaps": roadmaps,
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": total_count,
                    "totalPages": total_pages,
                    "hasNext": has_next,
                    "hasPrev": has_prev
                }
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
