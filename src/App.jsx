import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import EditBookForm from './components/EditBookForm';
import BookDetails from './components/BookDetails';
import ReviewForm from './components/ReviewForm';
import AddBookForm from './components/AddBookForm';
import Contact from './components/Contact';

const API_COLLECTION = 'http://localhost:3000/book-collection';
const API_WISHLIST = 'http://localhost:3000/wish-list';

const App = () =>
{
    const [search, setSearch] = useState('');
    const [activePage, setActivePage] = useState('home');
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookCollection, setBookCollection] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [editBook, setEditBook] = useState(null);
	const [addBook, setAddBook] = useState(false);
	const [addMethod, setAddMethod] = useState(null);
	const [sortMethod, setSortMethod] = useState(null);
	const [filterCriteria, setFilterCriteria] = useState({ genres: {}, minPages: 0, maxPages: 0, minYear: 0, maxYear: 0 });
	const [initialBounds, setInitialBounds] = useState({ genres: {}, minPages: 0, maxPages: 0, minYear: 0, maxYear: 0 });
	const [filterVisible, setFilterVisible] = useState(false);
	const [review, setReview] = useState({ rating: '', text: '' });
	const [reviewBook, setReviewBook] = useState(false);

	const genresList = ['fantasy', 'science fiction', 'horror', 'romans', 'thriller', 'kryminał', 'historia', 'poradnik', 'dla dzieci', 'dla młodzieży', 'erotyczne', 'komiks', 'manga', 'na podstawie gry', 'lektura', 'literatura piękna', 'przygoda', 'sensacja', 'biografia i reportaż', 'popularnonaukowe', 'poezja', 'beletrystyka'];

	const fetchBooks = async () =>
	{
		try
		{
			const response = await fetch(API_COLLECTION);
			const data = await response.json();
			setBookCollection(data);
		}
		catch (error)
		{
			console.error("Błąd podczas pobierania kolekcji książek:", error);
		}
	};

    const fetchWishList = async () =>
	{
		try
		{
			const response = await fetch(API_WISHLIST);
			const data = await response.json();
			setWishList(data);
		}
		catch (error)
		{
			console.error("Błąd podczas pobierania listy życzeń:", error);
		}
    };

	const getLastBookId = async (isWishList = false) =>
	{
		const url = isWishList ? API_WISHLIST : API_COLLECTION;
		const response = await fetch(url);
		const books = await response.json();
		
		if (books.length === 0) return "1";
		
		const lastId = books[books.length - 1].id;
		return Number(lastId);
	};	

	const addBookToAPI = async (book, isWishList = false) =>
	{
		try
		{
			book.ocena = "-";
      		book.recenzja = "Brak recenzji";
			console.log("Dodawanie książki:", book);
			const url = isWishList ? API_WISHLIST : API_COLLECTION;
			await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(book),
			});

			await fetchBooks();
			await fetchWishList();
		}
		catch (error)
		{
			console.error("Błąd podczas dodawania książki:", error);
		}
    };

	const calculateFilterBounds = (books) => {
		const allBooks = [...bookCollection, ...wishList];
		if (allBooks.length === 0) {
			return { minPages: 1, maxPages: 1000, minYear: 1900, maxYear: new Date().getFullYear() };
		}

		const minPages = Math.min(...allBooks.map(book => book.liczba_stron));
		const maxPages = Math.max(...allBooks.map(book => book.liczba_stron));
		const minYear = Math.min(...allBooks.map(book => parseInt(book.data_wydania)));
		const maxYear = Math.max(...allBooks.map(book => parseInt(book.data_wydania)));

		return { minPages, maxPages, minYear, maxYear };
	};

	useEffect(() => {
		const bounds = calculateFilterBounds([...bookCollection, ...wishList]);
		setInitialBounds(bounds); 
		setFilterCriteria(prev => ({
			...prev,
			minPages: bounds.minPages,
			maxPages: bounds.maxPages,
			minYear: bounds.minYear,
			maxYear: bounds.maxYear
		}));
	}, [bookCollection, wishList]);

    const editBookInAPI = async (book, isWishList = false) =>
	{
		try
		{
			console.log("Edytowanie/recenzowanie książki:", book);
			const url = `${isWishList ? API_WISHLIST : API_COLLECTION}/${book.id}`;
			await fetch(url,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(book),
			});

			await fetchBooks();
			await fetchWishList();

			setSelectedBook(book);
		}
		catch (error)
		{
			console.error("Błąd podczas edytowania/recenzowania książki:", error);
		}
    };

	const handleEditClick = async (book) =>
	{
        setEditBook({ ...book });
    };

	const handleReviewClick = async (book) =>
	{
		setSelectedBook(book)
		setReviewBook(true);
	};

    const deleteBookFromAPI = async (book, isWishList) =>
	{
		try
		{
			const url = `${isWishList ? API_WISHLIST : API_COLLECTION}/${book.id}`;
			await fetch(url,
			{
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: book.id }),
			});
		
			await fetchBooks();
			await fetchWishList();
		}
		catch (error)
		{
			console.error("Błąd podczas usuwania książki:", error);
		}
	};
	  
	const handleDeleteClick = async (book) =>
	{
		console.log("Usuwanie książki:", book);
		const isWishList = activePage !== 'collection';
		await deleteBookFromAPI(book, isWishList);
		setSelectedBook(null);
	};

    const moveToCollection = async (book) =>
	{
		console.log("Przenoszenie książki do kolekcji:", book);
        await deleteBookFromAPI(book, true);
		const lastBookId = await getLastBookId();
		const newBook = { ...book, id: (lastBookId + 1).toString() };
        await addBookToAPI(newBook, false);
		setSelectedBook(null);
    };
	
	const moveToWishList = async (book) =>
	{
		console.log("Przenoszenie książki do listy życzeń:", book);
        await deleteBookFromAPI(book, false);
		const lastBookId = await getLastBookId(true);
		const newBook = { ...book, id: (lastBookId + 1).toString() };
        await addBookToAPI(newBook, true);
		setSelectedBook(null);
    };

    useEffect(() =>
	{
        fetchBooks();
        fetchWishList();
    }, []);

	const handleSortClick = () =>
	{
		const nextSortMethod = sortMethod === 'title' ? 'author' : sortMethod === 'author' ? 'date' : 'title';
		setSortMethod(nextSortMethod);
	};

	const handleFilter = (books) =>
    {
		const searchedBooks = books.filter(ksiazka =>
			ksiazka.tytul.toLowerCase().includes(search.toLowerCase()) ||
			ksiazka.autor.toLowerCase().includes(search.toLowerCase())
		);

		const filteredBooks = filterBooks(searchedBooks);
		const sortedFilteredBooks = sortBooks(filteredBooks);
		setBooksToDisplay(sortedFilteredBooks);
    };

    const posortowaneKsiazki = (activePage === 'collection' ? bookCollection : wishList).filter(ksiazka =>
        ksiazka.tytul.toLowerCase().includes(search.toLowerCase()) ||
        ksiazka.autor.toLowerCase().includes(search.toLowerCase())
    );

	const sortBooks = (books) => {
        if (sortMethod === 'title')
		{
            return [...books].sort((a, b) => a.tytul.localeCompare(b.tytul));
        }
		else if (sortMethod === 'author')
		{
			return [...books].sort((a, b) => a.autor.localeCompare(b.autor));
		}
		else if (sortMethod === 'date')
		{
            return [...books].sort((a, b) => a.id - b.id);
        }
        return books;
    };
	
	const filterBooks = (books) => {
		return books.filter(book => {
			const matchesSearch = search === '' ||
				book.tytul.toLowerCase().includes(search.toLowerCase()) ||
				book.autor.toLowerCase().includes(search.toLowerCase());

			const selectedGenres = Object.keys(filterCriteria.genres).filter(genre => filterCriteria.genres[genre]);
			const matchesGenres = selectedGenres.length === 0 || selectedGenres.every(genre => book.gatunki.includes(genre));
			const matchesPages = book.liczba_stron >= filterCriteria.minPages && book.liczba_stron <= filterCriteria.maxPages;
			const matchesYear = parseInt(book.data_wydania) >= filterCriteria.minYear && parseInt(book.data_wydania) <= filterCriteria.maxYear;
			return matchesSearch && matchesGenres && matchesPages && matchesYear;
		});
	};

	const handleFileUpload = (plik) =>
	{
		if (!plik) return;

		const reader = new FileReader();
		reader.onloadend = () =>
		{
			setEditBook({ ...editBook, obraz: reader.result });
		};
		
		reader.readAsDataURL(plik);
	};

	const renderReviewForm = () =>
	{
		return (
            <ReviewForm
                selectedBook={selectedBook}
                setReviewBook={setReviewBook}
                editBookInAPI={editBookInAPI}
                activePage={activePage}
            />
        );
	};

    const renderPage = () =>
	{
		if (activePage === 'home')
		{
			return (
				<div className="home">
					<h1>Aplikacja do zarządzania kolekcją książek</h1>
					<h3>Opis</h3>
				</div>
			);
		}
		
        if ((activePage === 'collection' || activePage === 'list') && selectedBook) {
			return (
				<BookDetails 
					activePage={activePage}
					selectedBook={selectedBook}
					setSelectedBook={setSelectedBook}
					handleEditClick={handleEditClick}
					handleReviewClick={handleReviewClick}
					handleDeleteClick={handleDeleteClick}
					moveToCollection={moveToCollection}
					moveToWishList={moveToWishList}
				/>
			);
		}

		if (activePage === 'contact')
		{
			return (
				<Contact
					handleFormSubmit={(formData) => {
						console.log('Formularz wysłany:', formData);
						// logika wysyłania wiadomości email
					}}
				/>
			);
		}

		const filteredBooks = filterBooks(activePage === 'collection' ? bookCollection : wishList);
		const sortedBooks = sortBooks(filteredBooks);

        return (
            <section className="book-collection">
				{sortedBooks.map((ksiazka) => (
					<div key={ksiazka.id} className="book-card" onClick={() => setSelectedBook(ksiazka)}>
						<img src={ksiazka.obraz} alt={ksiazka.tytul} onError={(e) => { e.target.onerror = null; e.target.src = 'unknown.jpg'; }} />
						<p className="book-card-title">{ksiazka.tytul}</p>
						<p className="book-card-author">{ksiazka.autor}</p>
					</div>
				))}
        	</section>
        );
    };

	const fetchBookByIsbn = async (isbn) =>
	{
		try
		{
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
			const data = await response.json();

			if (data.items && data.items.length > 0)
			{
				const book = data.items[0].volumeInfo;
				return {
					tytul: book.title || '',
					autor: book.authors ? book.authors.join(', ') : '',
					obraz: book.imageLinks ? book.imageLinks.thumbnail : 'unknown.jpg',
					wydawnictwo: book.publisher || '',
					data_wydania: book.publishedDate || '',
					liczba_stron: book.pageCount || '',
					opis: book.description || ''
				};
			}
			else
			{
				alert("Nie znaleziono książki o tym kodzie ISBN.");
				return null;
			}
		}
		catch (error)
		{
			console.error("Błąd podczas pobierania danych książki:", error);
			alert("Wystąpił błąd podczas pobierania danych książki.");
			return null;
		}
	};		

	const handleCheckIsbn = async () =>
	{
		if (!addBook.isbn)
		{
			alert("Pole z kodem ISBN musi być wypełnione!");
			return;
		}
	
		const bookData = await fetchBookByIsbn(addBook.isbn);
		if (bookData)
		{
			setAddBook({ ...addBook, ...bookData });
		}
	};

    const renderEditForm = () =>
	{
        if (editBook)
		{
            return (
				<EditBookForm
					editBook={editBook}
					setEditBook={setEditBook}
					editBookInAPI={editBookInAPI}
					activePage={activePage}
				/>
			);
        }
    };

	const handleAddClick = async () =>
	{
        setAddBook(true);
		setAddMethod(null);
    };
	
	const handleAddMethodSelect = async (method) =>
	{
        setAddMethod(method);
		if (method === 'manual')
		{
			setAddBook(true);
		}
    };

	const renderAddBookOptions = () =>
	{
		return (
			<div className="add-method">
				<div className="add-method-selection">
					<h2>Wybierz metodę dodawania książki</h2>
					<button onClick={() => handleAddMethodSelect('manual')}>Dodaj manualnie</button>
					<button onClick={() => handleAddMethodSelect('isbn')}>Dodaj za pomocą kodu ISBN</button>
					<button onClick={() => setAddBook(false)}>Anuluj</button>
				</div>
			</div>
		);
	};

	const renderAddForm = () =>
	{
        return (
			<AddBookForm
				addBook={addBook}
				setAddBook={setAddBook}
				addMethod={addMethod}
				handleFileUpload={handleFileUpload}
				handleCheckIsbn={handleCheckIsbn}
				activePage={activePage}
				getLastBookId={getLastBookId}
				addBookToAPI={addBookToAPI}
				setEditBook={setEditBook}
				setAddMethod={setAddMethod}
			/>
		);
    };

    return (
        <div className="app">
            <Header 
                activePage={activePage} 
                setActivePage={setActivePage} 
                disabled={!!(selectedBook || editBook || addBook || reviewBook)} 
            />
			<main>
				<Main
					activePage={activePage}
					selectedBook={selectedBook}
					editBook={editBook}
					addBook={addBook}
					reviewBook={reviewBook}
					handleSortClick={handleSortClick}
					sortMethod={sortMethod}
					search={search}
					setSearch={setSearch}
					setFilterVisible={setFilterVisible}
					filterVisible={filterVisible}
					genresList={genresList}
					filterCriteria={filterCriteria}
					setFilterCriteria={setFilterCriteria}
					initialBounds={initialBounds}
					handleAddClick={handleAddClick}
					renderEditForm={renderEditForm}
					addMethod={addMethod}
					renderAddBookOptions={renderAddBookOptions}
					renderAddForm={renderAddForm}
					renderPage={renderPage}
					renderReviewForm={renderReviewForm}
				/>
			</main>
			<Footer />
        </div>
    );
};

export default App;