import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'shared'))

from packages.shared.util.parse import parse_event

def parse_ai_event(event):
    """Parse event for AI service"""
    return parse_event(
        event,
        expected_fields=['skillData', 'timeframe', 'resourceTypes']
    )