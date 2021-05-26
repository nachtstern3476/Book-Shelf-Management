document.addEventListener("DOMContentLoaded", function(){
	const form = document.getElementById("add-buku")
	const searchBtn = document.getElementById("search")
	const modal = document.querySelector(".modal")

	if (isStorageExist()) {
		loadBooks()
	}

	window.onclick = function(e){
		if (e.target == modal) {
			closeModal(form)
		}
	}

	form.addEventListener("submit", function(e){
		e.preventDefault()
		addNewBook()
	})

	searchBtn.addEventListener("click", function(e){
		const searchContainer = document.getElementById("search-result")
		const input = document.getElementById("search-input").value
		const bookItems = searchBook(input)

		emptySearchContainer()
		searchContainer.style.display = 'block'

		if (typeof(bookItems) == 'object') {
			for(item of bookItems){
				searchContainer.append(item)
			}
		}else{ searchContainer.innerText = "Data tidak ditemukan" }
	})
})

document.addEventListener("onBooksSaved", ()=>{
	emptySearchContainer()
})

document.addEventListener("onBooksLoaded", ()=>{
	emptySearchContainer()
	refreshBooks()
})