import React from "react";

const BookDetails = ({
  activePage,
  selectedBook,
  setSelectedBook,
  handleEditClick,
  handleReviewClick,
  handleDeleteClick,
  moveToCollection,
  moveToWishList,
}) => {
  if (!selectedBook) return null;

  return (
    <div className="book-details">
      <img
        src={selectedBook.cover}
        alt={selectedBook.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "unknown.jpg";
        }}
      />
      <div className="book-info">
        <p className="book-info-title">{selectedBook.title}</p>
        <p className="book-info-author">{selectedBook.author}</p>
        <p className="book-info-other">Gatunki: {selectedBook.genres}</p>
        <p className="book-info-other">Wydawnictwo: {selectedBook.publisher}</p>
        <p className="book-info-other">Data wydania: {selectedBook.date}</p>
        <p className="book-info-other">Liczba stron: {selectedBook.pages}</p>
        <p className="book-info-other">ISBN: {selectedBook.isbn}</p>
        <p className="book-info-other">
          Recenzja: {selectedBook.rate}/10 - {selectedBook.review}
        </p>
        <p className="book-info-desc">Opis: {selectedBook.desc}</p>
        <div className="book-actions">
          <button onClick={() => setSelectedBook(null)}>Powrót</button>
          <button onClick={() => handleEditClick(selectedBook)}>Edytuj</button>
          <button onClick={() => handleReviewClick(selectedBook)}>
            Recenzja
          </button>
          {activePage === "collection" && (
            <button onClick={() => moveToWishList(selectedBook)}>
              Przenieś do listy życzeń
            </button>
          )}
          {activePage === "list" && (
            <button onClick={() => moveToCollection(selectedBook)}>
              Przenieś do kolekcji
            </button>
          )}
          <button onClick={() => handleDeleteClick(selectedBook)}>Usuń</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;