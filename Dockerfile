FROM alpine

RUN apk add --no-cache py3-gunicorn python3 \
        && pip3 install --upgrade pip


ADD . /code/

COPY config.py.example /config.py

RUN pip3 install /code/

EXPOSE 5000

ENTRYPOINT ["gunicorn", "--workers=2", "--bind=0.0.0.0:5000", "npserver:app"]