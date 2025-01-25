const BookDetails = ({ activePage, selectedBook, setSelectedBook, handleEditClick, handleReviewClick, handleDeleteClick, moveToCollection, moveToWishList }) => {
    if (!selectedBook) return null;

    return (
        <div className="book-details">
            <img
                src={selectedBook.obraz}
                alt={selectedBook.tytul}
                onError={(e) => { e.target.onerror = null; e.target.src = 'unknown.jpg'; }}
            />
            <div className="book-info">
                <p className="book-info-title">{selectedBook.tytul}</p>
                <p className="book-info-author">{selectedBook.autor}</p>
                <p className="book-info-other">Gatunki: {selectedBook.gatunki}</p>
                <p className="book-info-other">Wydawnictwo: {selectedBook.wydawnictwo}</p>
                <p className="book-info-other">Data wydania: {selectedBook.data_wydania}</p>
                <p className="book-info-other">Liczba stron: {selectedBook.liczba_stron}</p>
                <p className="book-info-other">ISBN: {selectedBook.isbn}</p>
                <p className="book-info-other">Recenzja: {selectedBook.ocena}/10 - {selectedBook.recenzja}</p>
                <p className="book-info-desc">Opis: {selectedBook.opis}</p>
                <div className="book-actions">
                    <button onClick={() => setSelectedBook(null)}>Powrót</button>
                    <button onClick={() => handleEditClick(selectedBook)}>Edytuj</button>
                    <button onClick={() => handleReviewClick(selectedBook)}>Recenzja</button>
					{activePage === 'collection' && (
                        <button onClick={() => moveToWishList(selectedBook)}>Przenieś do listy życzeń</button>
                    )}
                    {activePage === 'list' && (
                        <button onClick={() => moveToCollection(selectedBook)}>Przenieś do kolekcji</button>
                    )}
                    <button onClick={() => handleDeleteClick(selectedBook)}>Usuń</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;