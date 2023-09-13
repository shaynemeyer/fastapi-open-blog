# Open Blog API

A Python API using FastAPI & SQLite database.

## Running locally

### Create a virtual env

```bash
python3 -m venv env
```

## Activate the env

```bash
source env/bin/activate
```

## Install the dependencies

```bash
python3 -m pip install -r requirements.txt
```

## Restart the environment

```bash
deactivate
source env/bin/activate
```

## Start the API

```bash
uvicorn main:app --reload
```
