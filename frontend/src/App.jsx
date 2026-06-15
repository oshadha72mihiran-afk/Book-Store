import { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import EditBookForm from "./components/EditBookForm";
import "./index.css";

const API_URL = "http://localhost:8000";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    try {
      const response = await axios.post(`${API_URL}/books`, bookData);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const response = await axios.put(`${API_URL}/books/${id}`, bookData);
      setBooks(books.map((book) => (book.id === id ? response.data : book)));
      setEditingBook(null); // Close the edit form
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Optional: Fetch a single book by ID (if you want to show details)
  const getBookById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      console.log("Book details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Book Store</h1>
        <p>Manage your book collection</p>
      </header>

      <BookForm onAddBook={addBook} />
      <BookList books={books} onDelete={deleteBook} onEdit={setEditingBook} />

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onUpdate={updateBook}
          onCancel={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}

export default App;
