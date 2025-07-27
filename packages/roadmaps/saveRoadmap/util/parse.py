import json

def validate_roadmap_data(roadmap_data):
    """Validate roadmap data and return error response if validation fails"""
    if not roadmap_data.get('title'):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Title is required'})
        }
    
    if not roadmap_data.get('content'):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'Content is required'})
        }
    
    if not roadmap_data.get('userId'):
        return {
            'statusCode': 400,
            'body': json.dumps({'ok': False, 'error': 'User ID is required'})
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
        
        roadmap_data = body.get('roadmapData')
        if not roadmap_data:
            raise ValueError('roadmapData is required')
        
        return roadmap_data
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)
