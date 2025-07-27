import json

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
        
        skill_data = body.get('skillData')
        if not skill_data:
            raise ValueError('skill is required')
        
        timeframe = body.get('timeframe')
        resource_types = body.get('resourceTypes')
        
        return skill_data, timeframe, resource_types
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)