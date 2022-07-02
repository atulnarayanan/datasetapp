# syntax=docker/dockerfile:1
FROM python:3

# env variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# work directory
WORKDIR /app


# install psycopg2 dependencies
RUN apt-get update \
    && apt-get install gcc netcat python3-dev musl-dev --no-install-recommends --no-install-suggests -y

# dependencies
RUN pip3 install --upgrade pip
COPY ./backend/requirements.txt /app/backend/
RUN pip3 install -r /app/backend/requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

#Project files copy
COPY ./backend /app/backend/

# run entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]