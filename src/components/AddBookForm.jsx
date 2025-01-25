import React, { useState, useEffect } from 'react';

const AddBookForm = ({
    addBook,
    setAddBook,
    addMethod,
    handleFileUpload,
    handleCheckIsbn,
    activePage,
    getLastBookId,
    addBookToAPI,
    setEditBook,
	setAddMethod,
}) => {
    const validateForm = () => {
        const requiredFields = [
            addBook.tytul,
            addBook.autor,
            addBook.gatunki,
            addBook.wydawnictwo,
            addBook.data_wydania,
            addBook.liczba_stron,
            addBook.isbn,
            addBook.opis,
        ];

		if (addMethod === 'manual') {
            requiredFields.splice(requiredFields.indexOf(addBook.isbn), 1);
        }

        if (requiredFields.some(field => !field)) {
            alert("Wszystkie pola muszą być wypełnione!");
            return false;
        }

        if (!addBook.obraz) {
            addBook.obraz = 'unknown.jpg';
        }

        return true;
    };

    const handleAddBook = async () => {
        if (validateForm()) {
            const isWishList = activePage !== 'collection';
            const lastBookId = await getLastBookId(isWishList);
            const newBook = { ...addBook, id: (lastBookId + 1).toString() };
            await addBookToAPI(newBook, isWishList);

            setEditBook(null);
            setAddBook(false);
        }
    };

    return (
        <div className="edit-book">
            <div className="edit-book-form">
                <h2>Dodaj książkę</h2>
                {addMethod === 'isbn' && (
                    <div className="input-row">
                        <label>
                            ISBN:
                            <input
                                type="number"
                                value={addBook.isbn}
                                onChange={e => setAddBook({ ...addBook, isbn: e.target.value })}
                            />
                        </label>
                        <button onClick={handleCheckIsbn}>Sprawdź</button>
                    </div>
                )}
                <div className="input-row">
                    <label>
                        Okładka (URL lub plik):
                        <input
                            type="text"
                            value={addBook.obraz}
                            onChange={e => setAddBook({ ...addBook, obraz: e.target.value })}
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
                            value={addBook.tytul}
                            onChange={e => setAddBook({ ...addBook, tytul: e.target.value })}
                        />
                    </label>
                    <label>
                        Autor:
                        <input
                            type="text"
                            value={addBook.autor}
                            onChange={e => setAddBook({ ...addBook, autor: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Gatunki:
                        <input
                            type="text"
                            value={addBook.gatunki}
                            onChange={e => setAddBook({ ...addBook, gatunki: e.target.value })}
                        />
                    </label>
                    <label>
                        Wydawnictwo:
                        <input
                            type="text"
                            value={addBook.wydawnictwo}
                            onChange={e => setAddBook({ ...addBook, wydawnictwo: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Data wydania:
                        <input
                            type="date"
                            value={addBook.data_wydania}
                            onChange={e => setAddBook({ ...addBook, data_wydania: e.target.value })}
                        />
                    </label>
                    <label>
                        Liczba stron:
                        <input
                            type="number"
                            value={addBook.liczba_stron}
                            onChange={e => setAddBook({ ...addBook, liczba_stron: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Opis:
                        <textarea
                            value={addBook.opis}
                            onChange={e => setAddBook({ ...addBook, opis: e.target.value })}
                        />
                    </label>
                </div>
                <div className="edit-book-actions">
                    <button onClick={handleAddBook}>Dodaj</button>
                    <button
                        onClick={() => {
                            setAddBook(true);
                            setAddMethod(null);
                        }}
                    >
                        Anuluj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBookForm;