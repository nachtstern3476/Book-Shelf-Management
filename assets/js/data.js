const STORAGE_KEY = "BOOKS"
let books = []

function isStorageExist() {
	return typeof(Storage) == undefined? false: true
}

function loadBooks() {
	const serializeData = localStorage.getItem(STORAGE_KEY)	
	let data = JSON.parse(serializeData)

	if (data) books = data

	document.dispatchEvent(new Event("onBooksLoaded"))
}

function refreshBooks() {
	const readedContainer = document.getElementById(READED_BOOKS)
	const unreadContainer = document.getElementById(UNREAD_BOOKS)

	for(item of books){
		const book = createBookItem(item.judul, item.penulis, item.tahun, item.isReaded)
		book[BOOK_ID] = item.id

		item.isReaded ? readedContainer.append(book) : unreadContainer.append(book)
	}
}

function saveBook() {
	const book = JSON.stringify(books)
	localStorage.setItem(STORAGE_KEY, book)
	document.dispatchEvent(new Event("onBooksSaved"))
}

function updateBook() {
	isStorageExist() ? saveBook() : ''
}

function createBookObj(judul, penulis, tahun, isReaded) {
	return {id: +new Date(), judul, penulis, tahun, isReaded}
}

function findBook(bookId) {
	for(item of books){
		if (item.id == bookId) {
			return item
		}
	}
	return null
}

function findBookIndex(bookId) {
	let index = 0
	for(item of books){
		if (item.id == bookId) {
			return index
		}
		index++
	}

	return -1
}