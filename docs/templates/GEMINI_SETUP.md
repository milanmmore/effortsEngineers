# Gemini QA Setup

This project treats Gemini as an optional QA assistant. Do not place API keys in
the repository or in Markdown files.

## Recommended workflow

1. Start the backend with `npm start` from `effortsengineers-backend`.
2. Start the frontend with `npm start` from `effortsengineers-frontend`.
3. Exercise `GET /health` before running browser or API checks.
4. Record reproducible prompts, test data, expected results, and failures in the
	issue tracker rather than committing secrets or customer data.

## Minimum QA evidence

- Command and environment used.
- Endpoint or user flow tested.
- Expected and observed result.
- Sanitized logs or screenshots.
- Follow-up issue for every failure.
