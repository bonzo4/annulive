import json

def validate_roadmap_data(roadmap_data):
    """Validate roadmap data and return error response if validation fails"""
    if not roadmap_data.get('title'):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Title is required'})
        }
    
    if 'steps' in roadmap_data and not isinstance(roadmap_data.get('steps'), list):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Steps must be an array'})
        }
    
    if 'tags' in roadmap_data and not isinstance(roadmap_data.get('tags'), list):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Tags must be an array'})
        }
    
    if 'completedSteps' in roadmap_data and not isinstance(roadmap_data.get('completedSteps'), list):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Completed steps must be an array'})
        }
    
    return None

def parse(event):
    try:
        if isinstance(event, str):
            body = json.loads(event)
        elif isinstance(event, dict) and 'body' in event:
            body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        elif isinstance(event, dict):
            body = event
        else:
            raise ValueError(f"Invalid event format: expected string or dict, got {type(event)}")
        
        if not isinstance(body, dict):
            raise ValueError("Event body must be a JSON object")
        
        roadmap_id = body.get('roadmapId')
        if not roadmap_id:
            raise ValueError('roadmapId is required')
        
        roadmap_data = body.get('roadmapData')
        if not roadmap_data:
            raise ValueError('roadmapData is required')
        
        user_id = body.get('userId')
        if not user_id:
            raise ValueError('userId is required')
        
        return roadmap_id, roadmap_data, user_id
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)
