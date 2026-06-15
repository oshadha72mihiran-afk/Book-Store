import { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API_URL = "http://localhost:8000";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books
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

  // Add a new book
  const addBook = async (bookData) => {
    try {
      const response = await axios.post(`${API_URL}/books`, bookData);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book Store</h1>
          <p className="text-gray-600">Manage your book collection</p>
        </header>

        <BookForm onAddBook={addBook} />
        <BookList books={books} onDelete={deleteBook} />
      </div>
    </div>
  );
}

export default App;
