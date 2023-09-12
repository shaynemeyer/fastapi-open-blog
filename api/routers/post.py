import shutil
import string
import random
from fastapi import APIRouter, Depends, File, UploadFile
from routers.schemas import PostBase, PostDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_post

router = APIRouter(prefix="/post", tags=["post"])


@router.post("")
def create(request: PostBase, db: Session = Depends(get_db)):
    return db_post.create(db, request)


@router.get("/all")
def posts(db: Session = Depends(get_db)):
    return db_post.get_all(db)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    return db_post.delete(id, db)


@router.post("/images")
def upload_image(image: UploadFile = File(...)):
    letters = string.ascii_letters
    rand_str = "".join(random.choice(letters) for i in range(6))
    new = f"_{rand_str}."
    filename = new.join(image.filename.rsplit(".", 1))
    path = f"images/{filename}"

    with open(path, "w+b") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {"filename": path}
