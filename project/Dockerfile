FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./api /app

RUN ls

RUN pip3 install --no-cache-dir --upgrade -r /app/api_requirements.txt

EXPOSE 80

CMD ["uvicorn", "fast_api:app", "--host", "0.0.0.0", "port", "80"]