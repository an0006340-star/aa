"""Capacity Connect API."""

import json
import logging
import os
import urllib.request
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, Field, ValidationError, field_validator

logger = logging.getLogger(__name__)

app = FastAPI(title="Capacity Connect API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_MODEL = "gemini-3.6-flash"


class SkillAnalysisRequest(BaseModel):
    """Information about a person's skills and career goal."""

    skills: list[str] = Field(..., min_length=1, max_length=20)
    career_goal: str = Field(..., min_length=1, max_length=200)
    experience_years: int = Field(..., ge=0, le=60)

    @field_validator("skills")
    @classmethod
    def skills_must_not_be_blank(cls, skills: list[str]) -> list[str]:
        cleaned_skills = [skill.strip() for skill in skills]
        if any(not skill for skill in cleaned_skills):
            raise ValueError("Skills must not be blank.")
        return cleaned_skills

    @field_validator("career_goal")
    @classmethod
    def career_goal_must_not_be_blank(cls, career_goal: str) -> str:
        cleaned_goal = career_goal.strip()
        if not cleaned_goal:
            raise ValueError("Career goal must not be blank.")
        return cleaned_goal


class SkillAnalysisResponse(BaseModel):
    """Structured learning recommendations returned by Gemini."""

    strengths: list[str]
    skill_gaps: list[str]
    recommended_competency: str
    recommended_courses: list[str]
    short_personalized_learning_path: list[str]


def build_analysis_prompt(request: SkillAnalysisRequest) -> str:
    """Build a focused prompt from validated user input."""
    skills = ", ".join(request.skills)
    return f"""
You are a career development advisor.

Analyze this learner's current skills and career goal:
- Current skills: {skills}
- Career goal: {request.career_goal}
- Experience: {request.experience_years} years

Return a practical, encouraging analysis. Identify strengths supported by the
listed skills, realistic skill gaps for the career goal, one recommended
competency to focus on next, useful course topics or course titles, and a
short learning path with 3 to 5 ordered steps.

Return only valid JSON matching this exact shape:
{{
  "strengths": ["string"],
  "skill_gaps": ["string"],
  "recommended_competency": "string",
  "recommended_courses": ["string"],
  "short_personalized_learning_path": ["string"]
}}
""".strip()


def get_gemini_client() -> genai.Client:
    """Create a Gemini client using the workspace secret."""
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="GOOGLE_API_KEY is not configured.",
        )
    return genai.Client(api_key=api_key)


def parse_gemini_response(response: Any) -> SkillAnalysisResponse:
    """Validate Gemini's structured response before returning it to the client."""
    if getattr(response, "parsed", None) is not None:
        return SkillAnalysisResponse.model_validate(response.parsed)

    response_text = getattr(response, "text", None)
    if not response_text:
        raise ValueError("Gemini returned an empty response.")

    return SkillAnalysisResponse.model_validate(json.loads(response_text))


@app.get("/health")
def health() -> dict[str, str]:
    """Report whether the API is running."""
    return {"status": "ok"}


@app.get("/db-test")
def db_test() -> dict:
    """Test connection to Supabase."""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    request = urllib.request.Request(
        f"{url}/rest/v1/profiles?select=*&limit=1",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )


@app.post("/analyze-skills", response_model=SkillAnalysisResponse)
def analyze_skills(request: SkillAnalysisRequest) -> SkillAnalysisResponse:
    """Analyze skills and return a personalized learning recommendation."""
    try:
        client = get_gemini_client()
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=build_analysis_prompt(request),
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=SkillAnalysisResponse,
            ),
        )
        return parse_gemini_response(response)
    except HTTPException:
        raise
    except (ValueError, ValidationError, json.JSONDecodeError):
        logger.exception("Gemini returned an invalid skills analysis.")
        raise HTTPException(
            status_code=502,
            detail="The AI service returned an invalid analysis.",
        ) from None
    except Exception:
        logger.exception("Gemini skills analysis request failed.")
        raise HTTPException(
            status_code=502,
            detail="Unable to analyze skills right now.",
        ) from None


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
    )

class ProfileRequest(BaseModel):
    full_name: str
    email: str
    department: str
    role: str
    experience_years: int
    skills: list[str]
    career_goal: str


@app.post("/profiles")
def create_profile(profile: ProfileRequest) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(status_code=503, detail="Supabase variables missing.")

    data = {
        "full_name": profile.full_name,
        "email": profile.email,
        "department": profile.department,
        "role": profile.role,
        "experience_years": profile.experience_years,
        "skills": ", ".join(profile.skills),
        "career_goal": profile.career_goal,
    }

    request = urllib.request.Request(
        f"{url}/rest/v1/profiles",
        data=json.dumps(data).encode("utf-8"),
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@app.get("/profiles")
def get_profiles() -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    request = urllib.request.Request(
        f"{url}/rest/v1/profiles?select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

class AIRecommendationRequest(BaseModel):
    profile_id: str
    strengths: list[str]
    skill_gaps: list[str]
    recommended_competency: str
    recommended_courses: list[str]
    learning_path: list[str]


@app.post("/ai-recommendations")
def save_ai_recommendation(
    recommendation: AIRecommendationRequest,
) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    data = {
        "profile_id": recommendation.profile_id,
        "strengths": ", ".join(recommendation.strengths),
        "skill_gaps": ", ".join(recommendation.skill_gaps),
        "recommended_competency": recommendation.recommended_competency,
        "recommended_courses": ", ".join(recommendation.recommended_courses),
        "learning_path": ", ".join(recommendation.learning_path),
    }

    request = urllib.request.Request(
        f"{url}/rest/v1/ai_recommendations",
        data=json.dumps(data).encode("utf-8"),
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

@app.get("/courses")
def get_courses() -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    request = urllib.request.Request(
        f"{url}/rest/v1/courses?select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

class ProgressRequest(BaseModel):
    profile_id: str
    course_id: str
    progress_percent: int = Field(..., ge=0, le=100)
    status: str


@app.post("/learning-progress")
def save_learning_progress(progress: ProgressRequest) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    data = {
        "profile_id": progress.profile_id,
        "course_id": progress.course_id,
        "progress_percent": progress.progress_percent,
        "status": progress.status,
    }

    request = urllib.request.Request(
        f"{url}/rest/v1/learning_progress",
        data=json.dumps(data).encode("utf-8"),
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

class AssessmentResultRequest(BaseModel):
    profile_id: str
    course_id: str
    score: int
    total_questions: int
    feedback: str


@app.post("/assessment-results")
def save_assessment_result(result: AssessmentResultRequest) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    data = {
        "profile_id": result.profile_id,
        "course_id": result.course_id,
        "score": result.score,
        "total_questions": result.total_questions,
        "feedback": result.feedback,
    }

    request = urllib.request.Request(
        f"{url}/rest/v1/assessment_results",
        data=json.dumps(data).encode("utf-8"),
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

@app.get("/learning-progress/{profile_id}")
def get_learning_progress(profile_id: str) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    request = urllib.request.Request(
        f"{url}/rest/v1/learning_progress?profile_id=eq.{profile_id}&select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )

@app.get("/assessment-results/{profile_id}")
def get_assessment_results(profile_id: str) -> dict:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise HTTPException(
            status_code=503,
            detail="Supabase variables missing.",
        )

    request = urllib.request.Request(
        f"{url}/rest/v1/assessment_results?profile_id=eq.{profile_id}&select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {
                "status": "ok",
                "data": json.loads(response.read()),
            }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )