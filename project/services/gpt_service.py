import os
from openai import OpenAI
from dotenv import load_dotenv
from services.prompts import (
    EMPLOYMENT_COACH_PROMPT,
    JOB_RECOMMENDATION_PROMPT,
    JOB_POSTING_PROMPT,
    STUDY_GUIDE_PROMPT
)

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_prompt_for(message):
    message = message.lower()
    if "직업 선택" in message or "mbti" in message:
        return JOB_RECOMMENDATION_PROMPT
    elif "채용 공고" in message or "채용" in message:
        return JOB_POSTING_PROMPT
    elif "학습 자료" in message or "자격증" in message:
        return STUDY_GUIDE_PROMPT
    else:
        return EMPLOYMENT_COACH_PROMPT

def ask_gpt(message):
    try:
        prompt = get_prompt_for(message)
        response = client.chat.completions.create(
            model="gpt-4", 
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": message}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"오류가 발생했습니다: {e}"