from typing import List, Optional
import os

from openai import OpenAI

def ask_ai(skill: str, timeframe: Optional[str], resource_types: Optional[List[str]]):
    agent_endpoint = os.environ.get("AGENT_ENDPOINT")
    agent_access_key = os.environ.get("AGENT_ACCESS_KEY")
    
    if not agent_endpoint:
        raise ValueError("AGENT_ENDPOINT environment variable is required")
    if not agent_access_key:
        raise ValueError("AGENT_ACCESS_KEY environment variable is required")
    
    input_data = {
        'skill': skill,
        'timeframe': timeframe or 'AI will estimate',
        'resourceTypes': resource_types or ['All types']
    }
    
    try:
        client = OpenAI(
            base_url=agent_endpoint + "/api/v1/",
            api_key=agent_access_key,
        )
        
        messages = [
            {
                "role": "user",
                "content": f"Generate a learning roadmap for the following request: {input_data}"
            }
        ]
        
        response = client.chat.completions.create(
            model="n/a",
            messages=messages,
            extra_body={"include_retrieval_info": True}
        )
        
        response_content = ""
        for choice in response.choices:
            if choice.message.content:
                response_content += choice.message.content
            
        return response_content
        
    except Exception as e:
        raise Exception(f"Failed to get AI response: {str(e)}")