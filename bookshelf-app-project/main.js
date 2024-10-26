// Mendapatkan elemen-elemen HTML yang dibutuhkan
const bookForm = document.getElementById('bookForm');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');
const searchForm = document.getElementById('searchBook');
const searchInput = document.getElementById('searchBookTitle');

// Inisialisasi data buku di localStorage
const bookData = JSON.parse(localStorage.getItem('bookData')) || [];

// Fungsi untuk menambahkan buku baru
function addBook(title, author, year, isComplete) {
  // Membuat objek buku baru
  const newBook = {
    id: new Date().getTime(),
    title,
    author,
    year: parseInt(year), // mengubah tipe string ke number
    isComplete,
  };
  // Menambahkan buku baru ke dalam data buku
  bookData.push(newBook);
  // Menyimpan data buku ke dalam localStorage
  localStorage.setItem('bookData', JSON.stringify(bookData));
  // Merender ulang daftar buku
  renderBookList();
}

// Fungsi untuk merender daftar buku
function renderBookList() {
  // Mengosongkan daftar buku yang belum selesai dibaca
  incompleteBookList.innerHTML = '';
  // Mengosongkan daftar buku yang sudah selesai dibaca
  completeBookList.innerHTML = '';
  // Mengulang data buku
  bookData.forEach((book) => {
    // Membuat HTML untuk setiap buku
    const bookHTML = `
      <div data-bookid="${book.id}" data-testid="bookItem">
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      </div>
    `;
    // Menambahkan buku ke dalam daftar yang sesuai
    if (book.isComplete) {
      completeBookList.innerHTML += bookHTML;
    } else {
      incompleteBookList.innerHTML += bookHTML;
    }
  });
}

// Menambahkan event listener pada form tambah buku
bookForm.addEventListener('submit', (e) => {
  // Mencegah form dikirim
  e.preventDefault();
  // Mendapatkan nilai-nilai form
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;
  // Menambahkan buku baru
  addBook(title, author, year, isComplete);
});

// Menambahkan event listener pada daftar buku yang belum selesai dibaca
incompleteBookList.addEventListener('click', (e) => {
  // Mencegah event listener dijalankan pada elemen yang tidak diinginkan
  if (e.target.tagName === 'BUTTON') {
    // Mendapatkan ID buku
    const bookId = e.target.parentNode.parentNode.getAttribute('data-bookid');
    // Mendapatkan indeks buku
    const bookIndex = bookData.findIndex((book) => book.id === parseInt(bookId));
    // Menjalankan aksi yang sesuai
    if (e.target.dataset.testid === 'bookItemIsCompleteButton') {
      // Mengubah status buku menjadi selesai dibaca
      bookData[bookIndex].isComplete = true;
      // Menyimpan data buku ke dalam localStorage
      localStorage.setItem('bookData', JSON.stringify(bookData));
      // Merender ulang daftar buku
      renderBookList();
    } else if (e.target.dataset.testid === 'bookItemDeleteButton') {
      // Menghapus buku
      bookData.splice(bookIndex, 1);
      // Menyimpan data buku ke dalam localStorage
      localStorage.setItem('bookData', JSON.stringify(bookData));
      // Merender ulang daftar buku
      renderBookList();
    } else if (e.target.dataset.testid === 'bookItemEditButton') {
      // Mengedit buku
      editBook(bookId);
    }
  }
});

// Menambahkan event listener pada daftar buku yang sudah selesai dibaca
completeBookList.addEventListener('click', (e) => {
  // Mencegah event listener dijalankan pada elemen yang tidak diing inkan
  if (e.target.tagName === 'BUTTON') {
    // Mendapatkan ID buku
    const bookId = e.target.parentNode.parentNode.getAttribute('data-bookid');
    // Mendapatkan indeks buku
    const bookIndex = bookData.findIndex((book) => book.id === parseInt(bookId));
    // Menjalankan aksi yang sesuai
    if (e.target.dataset.testid === 'bookItemIsCompleteButton') {
      // Mengubah status buku menjadi belum selesai dibaca
      bookData[bookIndex].isComplete = false;
      // Menyimpan data buku ke dalam localStorage
      localStorage.setItem('bookData', JSON.stringify(bookData));
      // Merender ulang daftar buku
      renderBookList();
    } else if (e.target.dataset.testid === 'bookItemDeleteButton') {
      // Menghapus buku
      bookData.splice(bookIndex, 1);
      // Menyimpan data buku ke dalam localStorage
      localStorage.setItem('bookData', JSON.stringify(bookData));
      // Merender ulang daftar buku
      renderBookList();
    } else if (e.target.dataset.testid === 'bookItemEditButton') {
      // Mengedit buku
      editBook(bookId);
    }
  }
});

// Fungsi untuk mengedit buku
function editBook(bookId) {
  // Mendapatkan indeks buku
  const bookIndex = bookData.findIndex((book) => book.id === parseInt(bookId));
  // Mendapatkan buku yang akan diedit
  const book = bookData[bookIndex];
  // Mendapatkan nilai-nilai form edit buku
  const titleInput = document.getElementById('bookFormTitle');
  const authorInput = document.getElementById('bookFormAuthor');
  const yearInput = document.getElementById('bookFormYear');
  const isCompleteInput = document.getElementById('bookFormIsComplete');

  // Mengisi nilai-nilai form edit buku
  titleInput.value = book.title;
  authorInput.value = book.author;
  yearInput.value = book.year;
  isCompleteInput.checked = book.isComplete;

  // Menambahkan event listener pada form edit buku
  bookForm.addEventListener('submit', (e) => {
    // Mencegah form dikirim
    e.preventDefault();
    // Mengubah nilai-nilai buku
    book.title = titleInput.value;
    book.author = authorInput.value;
    book.year = yearInput.value;
    book.isComplete = isCompleteInput.checked;
    // Menyimpan data buku ke dalam localStorage
    localStorage.setItem('bookData', JSON.stringify(bookData));
    // Merender ulang daftar buku
    renderBookList();
  });
}

// Menambahkan event listener pada form pencarian buku
searchForm.addEventListener('submit', (e) => {
  // Mencegah form dikirim
  e.preventDefault();
  // Mendapatkan nilai pencarian
  const searchQuery = searchInput.value.toLowerCase();
  // Mencari buku yang sesuai
  const filteredBooks = bookData.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery);
  });
  // Mengosongkan daftar buku
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';
  // Merender ulang daftar buku yang sesuai
  filteredBooks.forEach((book) => {
    // Membuat HTML untuk setiap buku
    const bookHTML = `
      <div data-bookid="${book.id}" data-testid="bookItem">
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      </div>
    `;
    // Menambahkan buku ke dalam daftar yang sesuai
    if (book.isComplete) {
      completeBookList.innerHTML += bookHTML;
    } else {
      incompleteBookList.innerHTML += bookHTML;
    }
  });
});

// Merender ulang daftar buku secara awal
renderBookList();