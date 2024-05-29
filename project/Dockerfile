FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./api /app/api
COPY ./hasher /app/hasher
COPY ./scrapper /app/scrapper

WORKDIR /app

RUN pip3 install --no-cache-dir --upgrade -r /app/api/api_requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r /app/hasher/hasher_requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r /app/scrapper/scrapper_requirements.txt

ENV PYTHONPATH=/app

EXPOSE 80

CMD ["uvicorn", "api.fast_api:app", "--host", "0.0.0.0", "--port", "80"]