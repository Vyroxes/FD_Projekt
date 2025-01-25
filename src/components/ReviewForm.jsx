import React, { useState, useEffect } from 'react';

const ReviewForm = ({ selectedBook, setReviewBook, editBookInAPI, activePage }) => {
    const [review, setReview] = useState({ rating: '', text: '' });

    useEffect(() => {
        if (selectedBook && selectedBook.ocena && selectedBook.recenzja) {
            setReview({
                rating: selectedBook.ocena,
                text: selectedBook.recenzja,
            });
        }
    }, [selectedBook]);

	const handleDeleteReview = async () => {
        try {
            const updatedBook = { ...selectedBook, ocena: '-', recenzja: 'Brak recenzji' };

            const isWishList = activePage !== 'collection';
            await editBookInAPI(updatedBook, isWishList);

            setReviewBook(false);
        } catch (error) {
            console.error("Błąd podczas usuwania recenzji: ", error);
        }
    };

    const handleBookReview = async () => {
        try {
            if (!review.rating || !review.text.trim()) {
                alert("Wszystkie pola muszą być wypełnione!");
                return;
            }

            const isValidRating = (rating) => {
                const parsedRating = parseFloat(rating);
                return !isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 10 && (parsedRating * 10) % 1 === 0;
            };

            if (!isValidRating(review.rating)) {
                alert("Ocena musi być liczbą od 0 do 10 z dokładnością maksymalnie do 0.1!");
                return;
            }

            const updatedBook = { ...selectedBook, ocena: review.rating, recenzja: review.text };

            const isWishList = activePage !== 'collection';
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
                            value={review.rating}
                            onChange={(e) => setReview({ ...review, rating: e.target.value })}
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