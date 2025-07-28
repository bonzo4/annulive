import json

def parse(event):
    skill_data = event.get('skillData')
    if not skill_data:
        raise ValueError('skillData is required')
    
    skill = skill_data.get('skillData')
    if not skill:
        raise ValueError('skill is required')
    
    timeframe = skill_data.get('timeframe')
    resource_types = skill_data.get('resourceTypes')
    
    return skill, timeframe, resource_types