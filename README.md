### Dataset App
A simple Dataset analytics application that allows the users to Upload, Compute based on certain operations (min, max and sum) and also plot scatter plots based on the dataset selected.

## Starting the Application

- docker-compose up -d --build

## Accessing the Dataset Application

- Access via http://localhost to access the frontend

## Import
- Import any Dataset with different column types (int, float and str mainly considered here) and pick int and float fields for compute and plot.

### Notes

1. Backend Improvements (TBD): Adding Celery async task queue for processing dataset uploads to scale large dataset imports.
