"""Capacity Connect API."""

import json
import logging
import os
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