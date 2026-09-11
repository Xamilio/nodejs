import { BookType } from "./types/BookType.js"

type showBooksType = (book: BookType) => string 

const showBooks: showBooksType = (book) => {
    const coverEmoji = book.price > 350 ? "🔮" : book.price > 300 ? "📖" : "📕";
    return `<div class="book-card">
    <div class="book-cover">${coverEmoji}</div>
    <h2 class="book-tytle">${book.title}</h2>
    <p class="book-price">${book.price} <span>грн</span></p>
    <span class="book-status ${book.is_active ? "active" : ""}">
        ${book.is_active ? "● В наявності" : "✕ Немає"}
    </span>
    <a href="/books/${book.id}" class="book-button">
        Перейти до книги
    </a>
</div>`
}

export { showBooks }