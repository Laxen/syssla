# Syssla

Todo app built on Flask and React.

## Installation
Clone this repo, then rename "state_template.json" to "state.json".

## How to run in Docker
```bash
docker compose up -d
```
This will spin up two docker containers, one for backend and one for frontend. Both have debug enabled, so you can just run "git pull" in the future to automatically get the latest updates.

## How to run manually

#### Backend (localhost:5000)
```bash
cd backend
poetry run start
```

#### Frontend (localhost:5173)
```bash
cd frontend
npm start
```
