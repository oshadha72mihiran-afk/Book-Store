from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import services, models, schemas
from db import get_db, engine
from sqlalchemy.orm import Session

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/books", response_model=list[schemas.Book])
def get_all_books(db: Session = Depends(get_db)):
    return services.get_books(db)

@app.get("/books/{book_id}", response_model=schemas.Book)
def get_book_by_id(book_id: int, db: Session = Depends(get_db)):
    book_queryset = services.get_book_by_id(db, book_id)
    if not book_queryset:
        raise HTTPException(status_code=404, detail="Book not found")
    return book_queryset

@app.post("/books", response_model=schemas.Book)
def create_new_book(data: schemas.BookCreate, db: Session = Depends(get_db)):
    return services.create_book(db, data)


@app.put("/books/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, data: schemas.BookCreate, db: Session = Depends(get_db)):
    book_queryset = services.update_book(db, book_id, data)
    if not book_queryset:
        raise HTTPException(status_code=404, detail="Book not found")
    return book_queryset

@app.delete("/books/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book_queryset = services.delete_book(db, book_id)
    if not book_queryset:
        raise HTTPException(status_code=404, detail="Book not found")
    return book_queryset