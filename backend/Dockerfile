FROM python:3-slim
WORKDIR app/backend
COPY backend .
RUN pip install poetry
RUN poetry install
EXPOSE 5000
CMD poetry run start
