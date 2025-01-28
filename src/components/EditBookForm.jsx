import React from "react";

const EditBookForm = ({
  editBook,
  setEditBook,
  editBookInAPI,
  handleFileUpload,
  activePage,
}) => {
  const handleBookEdit = async () => {
    const {
      title,
      author,
      genres,
      publisher,
      date,
      pages,
      isbn,
      desc,
      rate,
      review,
    } = editBook;

    if (
      !title ||
      !author ||
      !genres ||
      !publisher ||
      !date ||
      !pages ||
      !isbn ||
      !desc
    ) {
      alert("Wszystkie pola muszą być wypełnione!");
      return;
    }

    const isWishList = activePage !== "collection";

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
              value={editBook.cover}
              onChange={(e) =>
                setEditBook({ ...editBook, cover: e.target.value })
              }
            />
          </label>
          <label>
            Lub wybierz plik:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], "edit")}
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            Tytuł:
            <input
              type="text"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
            />
          </label>
          <label>
            Autor:
            <input
              type="text"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            Gatunki:
            <input
              type="text"
              value={editBook.genres}
              onChange={(e) =>
                setEditBook({ ...editBook, genres: e.target.value })
              }
            />
          </label>
          <label>
            Wydawnictwo:
            <input
              type="text"
              value={editBook.publisher}
              onChange={(e) =>
                setEditBook({ ...editBook, publisher: e.target.value })
              }
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            Data wydania:
            <input
              type="date"
              value={editBook.date}
              onChange={(e) =>
                setEditBook({ ...editBook, date: e.target.value })
              }
            />
          </label>
          <label>
            Liczba stron:
            <input
              type="number"
              value={editBook.pages}
              onChange={(e) =>
                setEditBook({ ...editBook, pages: e.target.value })
              }
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            ISBN:
            <input
              type="text"
              value={editBook.isbn}
              onChange={(e) =>
                setEditBook({ ...editBook, isbn: e.target.value })
              }
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            Opis:
            <textarea
              value={editBook.desc}
              onChange={(e) =>
                setEditBook({ ...editBook, desc: e.target.value })
              }
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