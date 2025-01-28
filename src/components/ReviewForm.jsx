import React, { useState, useEffect } from "react";

const ReviewForm = ({
  selectedBook,
  setReviewBook,
  editBookInAPI,
  activePage,
}) => {
  const [review, setReview] = useState({ rate: "", text: "" });

  useEffect(() => {
    if (selectedBook && selectedBook.rate && selectedBook.review) {
      setReview({
        rate: selectedBook.rate,
        text: selectedBook.review,
      });
    }
  }, [selectedBook]);

  const handleDeleteReview = async () => {
    try {
      const updatedBook = {
        ...selectedBook,
        rate: "-",
        review: "Brak recenzji",
      };

      const isWishList = activePage !== "collection";
      await editBookInAPI(updatedBook, isWishList);

      setReviewBook(false);
    } catch (error) {
      console.error("Błąd podczas usuwania recenzji: ", error);
    }
  };

  const handleBookReview = async () => {
    try {
      if (!review.rate || !review.text.trim()) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
      }

      const isValidRating = (rate) => {
        const parsedRating = parseFloat(rate);
        return (
          !isNaN(parsedRating) &&
          parsedRating >= 0 &&
          parsedRating <= 10 &&
          (parsedRating * 10) % 1 === 0
        );
      };

      if (!isValidRating(review.rate)) {
        alert(
          "Ocena musi być liczbą od 0 do 10 z dokładnością maksymalnie do jednego miejsca po przecinku!",
        );
        return;
      }

      const updatedBook = {
        ...selectedBook,
        rate: review.rate,
        review: review.text,
      };

      const isWishList = activePage !== "collection";
      await editBookInAPI(updatedBook, isWishList);

      setReviewBook(false);
    } catch (error) {
      console.error("Błąd podczas recenzowania książki: ", error);
    }
  };

  return (
    <div className="review">
      <div className="review-form">
        <h2>Dodaj recenzję</h2>
        <div className="input-row">
          <label>
            Ocena (0-10):
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={review.rate}
              onChange={(e) => setReview({ ...review, rate: e.target.value })}
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            Recenzja:
            <textarea
              value={review.text}
              onChange={(e) => setReview({ ...review, text: e.target.value })}
            />
          </label>
        </div>
        <div className="review-actions">
          <button onClick={handleBookReview}>Dodaj</button>
          <button onClick={handleDeleteReview}>Usuń</button>
          <button onClick={() => setReviewBook(false)}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;