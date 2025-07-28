import json

def parse(event):
    try:
        skill_data = event.get('skillData')
        if not skill_data:
            raise ValueError('skillData is required')
        
        if isinstance(skill_data, str):
            skill_data = json.loads(skill_data)
        
        skill = skill_data.get('skillData')
        if not skill:
            raise ValueError('skill is required')
        
        timeframe = skill_data.get('timeframe')
        resource_types = skill_data.get('resourceTypes')
        
        return skill, timeframe, resource_types
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)