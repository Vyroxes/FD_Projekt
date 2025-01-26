import React from "react";

const Main =
({
    activePage,
    selectedBook,
    editBook,
    addBook,
    reviewBook,
    handleSortClick,
    sortMethod,
    search,
    setSearch,
    setFilterVisible,
    filterVisible,
    genresList,
    filterCriteria,
    setFilterCriteria,
    initialBounds,
    handleAddClick,
    renderEditForm,
    addMethod,
    renderAddBookOptions,
    renderAddForm,
    renderPage,
    renderReviewForm
}) =>
{
    return (
        <section>
            {activePage !== "home" && activePage !== "contact" && !selectedBook && !editBook && !addBook && !reviewBook && (
                <div className="search-section">
                    <div className="search-controls">
                        <button onClick={handleSortClick}>
                            Sortuj ({sortMethod === "title" ? "Tytuł" : sortMethod === "author" ? "Autor" : "Data dodania"})
                        </button>
                        <input
                            type="text"
                            placeholder="Tytuł lub autor książki"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button onClick={() => setFilterVisible(prevState => !prevState)}>Filtruj</button>
                    </div>
                    <button className="search-section-add-button" onClick={handleAddClick}>Dodaj</button>
                </div>
            )}
            {activePage !== "home" && activePage !== "contact" && !selectedBook && !editBook && !addBook && !reviewBook && filterVisible && (
                <div className="filter-section">
                    <div className="filter-controls">
                        <h3>Gatunki</h3>
                        {genresList.map((genre) => (
                            <label key={genre}>
                                <input
                                    type="checkbox"
                                    checked={filterCriteria.genres[genre] || false}
                                    onChange={(e) => setFilterCriteria({
                                        ...filterCriteria,
                                        genres: {
                                            ...filterCriteria.genres,
                                            [genre]: e.target.checked
                                        }
                                    })}
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                    <div className="filter-controls">
                        <h3>Liczba stron</h3>
                        <div className="filter-item">
                            <label>
                                Od:
                                <input
                                    type="range"
                                    min={initialBounds.minPages}
                                    max={initialBounds.maxPages}
                                    value={filterCriteria.minPages}
                                    onChange={(e) => setFilterCriteria({ ...filterCriteria, minPages: e.target.value })}
                                />
                                {filterCriteria.minPages}
                            </label>
                        </div>
                        <div className="filter-item">
                            <label>
                                Do:
                                <input
                                    type="range"
                                    min={initialBounds.minPages}
                                    max={initialBounds.maxPages}
                                    value={filterCriteria.maxPages}
                                    onChange={(e) => setFilterCriteria({ ...filterCriteria, maxPages: e.target.value })}
                                />
                                {filterCriteria.maxPages}
                            </label>
                        </div>
                    </div>
                    <div className="filter-controls">
                        <h3>Rok wydania</h3>
                        <div className="filter-item">
                            <label>
                                Od:
                                <input
                                    type="range"
                                    min={initialBounds.minYear}
                                    max={initialBounds.maxYear}
                                    value={filterCriteria.minYear}
                                    onChange={(e) => setFilterCriteria({ ...filterCriteria, minYear: e.target.value })}
                                />
                                {filterCriteria.minYear}
                            </label>
                        </div>
                        <div className="filter-item">
                            <label>
                                Do:
                                <input
                                    type="range"
                                    min={initialBounds.minYear}
                                    max={initialBounds.maxYear}
                                    value={filterCriteria.maxYear}
                                    onChange={(e) => setFilterCriteria({ ...filterCriteria, maxYear: e.target.value })}
                                />
                                {filterCriteria.maxYear}
                            </label>
                        </div>
                    </div>
                    <div className="filter-controls">
                        <button className="reset-button" onClick={() => {
                            setFilterCriteria({
                                genres: {},
                                minPages: initialBounds.minPages,
                                maxPages: initialBounds.maxPages,
                                minYear: initialBounds.minYear,
                                maxYear: initialBounds.maxYear,
                            });
                        }}>Resetuj</button>
                    </div>
                </div>
            )}
            {editBook && renderEditForm()}

            {!reviewBook && !editBook && addBook && (
                addMethod === null ? renderAddBookOptions() : renderAddForm()
            )}

            {!editBook && !addBook && !reviewBook && renderPage()}

            {reviewBook && renderReviewForm()}
        </section>
    );
};

export default Main;