import React from 'react';

const EditBookForm = ({ editBook, setEditBook, editBookInAPI, activePage }) =>
{
    const handleBookEdit = async () =>
    {
        const { tytul, autor, gatunki, wydawnictwo, data_wydania, liczba_stron, isbn, opis, ocena, recenzja } = editBook;
	
		if (!tytul || !autor || !gatunki || !wydawnictwo || !data_wydania || !liczba_stron || !isbn || !opis)
		{
			alert("Wszystkie pola muszą być wypełnione!");
			return;
		}
	
		const isWishList = activePage !== 'collection';
	
		await editBookInAPI(editBook, isWishList);
	
		setEditBook(null);
    };

    return (
        <div className="edit-book">
            <div className="edit-book-form">
                <h2>Edytuj książkę</h2>
				<div className="input-row">
                    <label>
                        Okładka (URL lub plik):
                        <input
                            type="text"
                            value={editBook.obraz}
                            onChange={e => setEditBook({ ...editBook, obraz: e.target.value })}
                        />
                    </label>
                    <label>
                        Lub wybierz plik:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e.target.files[0])}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Tytuł:
                        <input
                            type="text"
                            value={editBook.tytul}
                            onChange={(e) => setEditBook({ ...editBook, tytul: e.target.value })}
                        />
                    </label>
                    <label>
                        Autor:
                        <input
                            type="text"
                            value={editBook.autor}
                            onChange={(e) => setEditBook({ ...editBook, autor: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Gatunki:
                        <input
                            type="text"
                            value={editBook.gatunki}
                            onChange={(e) => setEditBook({ ...editBook, gatunki: e.target.value })}
                        />
                    </label>
                    <label>
                        Wydawnictwo:
                        <input
                            type="text"
                            value={editBook.wydawnictwo}
                            onChange={(e) => setEditBook({ ...editBook, wydawnictwo: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Data wydania:
                        <input
                            type="date"
                            value={editBook.data_wydania}
                            onChange={(e) => setEditBook({ ...editBook, data_wydania: e.target.value })}
                        />
                    </label>
                    <label>
                        Liczba stron:
                        <input
                            type="number"
                            value={editBook.liczba_stron}
                            onChange={(e) => setEditBook({ ...editBook, liczba_stron: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        ISBN:
                        <input
                            type="text"
                            value={editBook.isbn}
                            onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Opis:
                        <textarea
                            value={editBook.opis}
                            onChange={(e) => setEditBook({ ...editBook, opis: e.target.value })}
                        />
                    </label>
                </div>
                <div className="edit-book-actions">
                    <button onClick={handleBookEdit}>Zapisz zmiany</button>
                    <button onClick={() => setEditBook(null)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
};

export default EditBookForm;