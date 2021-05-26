const UNREAD_BOOKS = "unread"
const READED_BOOKS = "readed"
const BOOK_ID = "bookId"
const FORM_ELEMENT = document.getElementById("add-buku")

function createBookItem(judul, penulis, tahun, isReaded, isSearch=false) {
	const judulBuku = document.createElement("h3")
	judulBuku.innerText = judul

	const penulisContainer = document.createElement("p")
	const penulisBuku = document.createElement("span")
	penulisBuku.innerText = penulis
	penulisContainer.innerText = "penulis buku : "
	penulisContainer.append(penulisBuku)

	const tahunContainer = document.createElement("p")
	const tahunBuku = document.createElement("span")
	tahunBuku.innerText = tahun
	tahunContainer.innerText = "Tahun buku : "
	tahunContainer.append(tahunBuku)


	const textContainer = document.createElement("div")
	textContainer.classList.add("inner")
	textContainer.append(judulBuku, penulisContainer, tahunContainer)

	const container = document.createElement("div")
	const buttonContainer = document.createElement("div")
	buttonContainer.classList.add("button-container")
	container.classList.add("item")
	container.append(textContainer)

	if (isReaded) {
		if (isSearch) {
			const text = document.createElement("p")
			text.classList.add('read-status')
			text.innerText = "Sudah Dibaca"
			container.append(text)
		}else{
			buttonContainer.append(createUndoButton(), createDeleteButton())
			container.append(buttonContainer)
		}
	}else{
		if (isSearch) {
			const text = document.createElement("p")
			text.classList.add('read-status')
			text.innerText = "Belum Dibaca"
			container.append(text)
		}else{			
			container.append(createCheckButton())
		}
	}

	return container
}
function addNewBook() {
	const unreadContainer = document.getElementById(UNREAD_BOOKS)
	const judulBuku = document.getElementById("judul-buku").value
	const penulisBuku = document.getElementById("penulis-buku").value
	const tahunBuku = document.getElementById("tahun-buku").value

	const book = createBookItem(judulBuku, penulisBuku, tahunBuku, false)
	const bookObj = createBookObj(judulBuku, penulisBuku, tahunBuku, false)

	book[BOOK_ID] = bookObj.id
	books.push(bookObj)

	unreadContainer.append(book)
	updateBook()
	closeModal()
}

function addReadedBook(bookElement) {
	const readedContainer = document.getElementById(READED_BOOKS)
	const judulBuku = bookElement.querySelector(".inner > h3").innerText
	const penulisBuku = bookElement.querySelector(".inner > p:nth-child(even) > span").innerText
	const tahunBuku = bookElement.querySelector(".inner > p:nth-child(odd) > span").innerText

	const bookItem = createBookItem(judulBuku, penulisBuku, tahunBuku, true)
	const book = findBook(bookElement[BOOK_ID])
	bookItem[BOOK_ID] = book.id
	book.isReaded = true

	readedContainer.append(bookItem)
	bookElement.remove()

	updateBook()
}

function undoReadedBook(bookElement) {
	const unreadContainer = document.getElementById(UNREAD_BOOKS)
	const judulBuku = bookElement.parentElement.querySelector(".inner > h3").innerText
	const penulisBuku = bookElement.parentElement.querySelector(".inner > p:nth-child(even) > span").innerText
	const tahunBuku = bookElement.parentElement.querySelector(".inner > p:nth-child(odd) > span").innerText

	const bookItem = createBookItem(judulBuku, penulisBuku, tahunBuku, false)
	const book = findBook(bookElement.parentElement[BOOK_ID])
	bookItem[BOOK_ID] = book.id
	book.isReaded = false

	unreadContainer.append(bookItem)
	bookElement.parentElement.remove()

	updateBook()
}

function deleteReadedBook(bookElement) {
	const bookIndex = findBookIndex(bookElement.parentElement[BOOK_ID])
	books.splice(bookIndex, 1)

	bookElement.parentElement.remove()

	updateBook()
}

function searchBook(book) {
	const searchContainer = document.getElementById("search-result")
	let bookItems = []
	for(item of books){
		if (item.judul.toLowerCase() == book.toLowerCase() || item.penulis.toLowerCase() == book.toLowerCase()) {
			const bookItem = createBookItem(item.judul, item.penulis, item.tahun, item.isReaded, true)
			bookItem[BOOK_ID] = item.id
			bookItems.push(bookItem)
		}
	}

	if (bookItems.length) { return bookItems }
}

function emptySearchContainer() {
	const searchContainer = document.getElementById("search-result")
	const input = document.getElementById('search-input')
	input.value = ''
	searchContainer.style.display = 'none'

	while(searchContainer.firstChild){
		searchContainer.removeChild(searchContainer.lastChild)
	}
}

function createButton(buttonClass, eventListener) {
	const button = document.createElement("button")
	button.classList.add("btn", buttonClass)
	button.addEventListener("click", function(e) {
		eventListener(e)
	})
	return button
}

function createUndoButton() {
	return createButton("btn-undo", function(e) {
		undoReadedBook(e.target.parentElement)
	})
}

function createDeleteButton(){
	return createButton("btn-delete", function(e){
		deleteReadedBook(e.target.parentElement)
	})
}

function createCheckButton() {
	return createButton("btn-done", function(e){
		addReadedBook(e.target.parentElement)
	})
}

function closeModal(formElement=FORM_ELEMENT) {
	const toggler = document.getElementById("form-modal")
	toggler.checked = false
	formElement.reset()
}