import React, { useState, useEffect } from "react";

const AddBookForm =
({
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
}) =>
{
    const validateForm = () =>
	{
        const requiredFields =
		[
            addBook.title,
            addBook.author,
            addBook.genres,
            addBook.publisher,
            addBook.date,
            addBook.pages,
            addBook.isbn,
            addBook.desc,
        ];

        if (requiredFields.some(field => !field))
		{
            alert("Wszystkie pola muszą być wypełnione!");
            return false;
        }

        if (!addBook.cover)
		{
            addBook.cover = "unknown.jpg";
        }

        return true;
    };

    const handleAddBook = async () =>
	{
        if (validateForm())
		{
            const isWishList = activePage !== "collection";
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
                {addMethod === "isbn" && (
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
                            value={addBook.cover}
                            onChange={e => setAddBook({ ...addBook, cover: e.target.value })}
                        />
                    </label>
                    <label>
                        Lub wybierz plik:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e.target.files[0], "add")}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Tytuł:
                        <input
                            type="text"
                            value={addBook.title}
                            onChange={e => setAddBook({ ...addBook, title: e.target.value })}
                        />
                    </label>
                    <label>
                        Autor:
                        <input
                            type="text"
                            value={addBook.author}
                            onChange={e => setAddBook({ ...addBook, author: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Gatunki:
                        <input
                            type="text"
                            value={addBook.genres}
                            onChange={e => setAddBook({ ...addBook, genres: e.target.value })}
                        />
                    </label>
                    <label>
                        Wydawnictwo:
                        <input
                            type="text"
                            value={addBook.publisher}
                            onChange={e => setAddBook({ ...addBook, publisher: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Data wydania:
                        <input
                            type="date"
                            value={addBook.date}
                            onChange={e => setAddBook({ ...addBook, date: e.target.value })}
                        />
                    </label>
                    <label>
                        Liczba stron:
                        <input
                            type="number"
                            value={addBook.pages}
                            onChange={e => setAddBook({ ...addBook, pages: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        ISBN:
                        <input
                            type="number"
                            value={addBook.isbn}
                            onChange={e => setAddBook({ ...addBook, isbn: e.target.value })}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Opis:
                        <textarea
                            value={addBook.desc}
                            onChange={e => setAddBook({ ...addBook, desc: e.target.value })}
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