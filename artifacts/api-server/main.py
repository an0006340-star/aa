"""Capacity Connect API."""

from fastapi import FastAPI

app = FastAPI(title="Capacity Connect API")


@app.get("/health")
def health() -> dict[str, str]:
    """Report whether the API is running."""
    return {"status": "ok"}