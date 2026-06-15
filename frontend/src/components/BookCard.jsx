function BookCard({ book, onDelete, onEdit, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">By {book.author}</p>
      <p className="text-gray-500 text-sm mb-3">{book.description}</p>
      <p className="text-gray-400 text-sm mb-4">Year: {book.year}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onView(book)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(book)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
