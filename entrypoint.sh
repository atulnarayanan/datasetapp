#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python /app/backend/manage.py migrate
python /app/backend/manage.py collectstatic --no-input
/usr/local/bin/gunicorn backend.wsgi --bind 0.0.0.0:8000 --chdir=/app/backend --workers 4 --threads 4

exec "$@"