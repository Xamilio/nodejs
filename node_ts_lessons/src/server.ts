import http from "node:http"
import path from "node:path"
import fs from "node:fs"
import { showBooks } from "./showbooks.js"
import { books } from "./data/books.js"

const PORT: number = 4200

const MIME_TYPES: Record<string, string> = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const PATH_TO_PAGES = path.join("src", "pages");
    const rawUrl = req.url || '';
    const urlPath = rawUrl.split('?')[0];
    const ext = path.extname(urlPath).toLowerCase();

    console.log(`[${req.method}] ${req.url}`);

    if (req.method === "GET" && (urlPath === '/' || urlPath === '/index.html')) {
        const PATH_TO_INDEX_PAGE = path.join(PATH_TO_PAGES, 'index.html');
        const content = fs.readFileSync(PATH_TO_INDEX_PAGE);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write(content);
    }
    else if (req.method === "GET" && (urlPath === '/about' || urlPath === '/about.html')) {
        const PATH_TO_ABOUT_PAGE = path.join(PATH_TO_PAGES, 'about.html');
        const content = fs.readFileSync(PATH_TO_ABOUT_PAGE);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write(content);
    }
    else if (req.method === "GET" && ext === '.css') {
        const cssFilename = path.basename(urlPath);
        const PATH_TO_CSS = path.join("src", "styles", cssFilename);
        if (fs.existsSync(PATH_TO_CSS)) {
            const content = fs.readFileSync(PATH_TO_CSS);
            res.setHeader("Content-Type", "text/css; charset=utf-8");
            res.write(content);
        } else {
            res.statusCode = 404;
            res.write("CSS file not found");
        }
    }
    else if (req.method === "GET" && (urlPath.startsWith('/images/') || ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'].includes(ext))) {
        const imgFilename = path.basename(urlPath);
        const PATH_TO_IMAGE = path.join("src", "images", imgFilename);
        
        if (fs.existsSync(PATH_TO_IMAGE)) {
            const content = fs.readFileSync(PATH_TO_IMAGE);
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader("Content-Type", contentType);
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.write(content);
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.write("Image not found");
        }
    }
    else if (req.method === "POST") {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        const user = {
            name: "Artem",
            age: 20
        };
        res.write(JSON.stringify(user));
    }
    else if (req.method === "GET" && req.url) {
        const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
        const pathname = parsedUrl.pathname;
        const searchParams = parsedUrl.searchParams;

        const matchBookId = pathname.match(/^\/(?:books|book)\/(\d+)$/);
        let bookId: number | null = matchBookId ? parseInt(matchBookId[1], 10) : null;

        if (bookId === null && (pathname === '/books' || pathname === '/book') && searchParams.has('id')) {
            bookId = parseInt(searchParams.get('id')!, 10);
        }

        if (bookId !== null) {
            const book = books.find(b => b.id === bookId);
            if (book) {
                const coverEmoji = book.price > 350 ? "🔮" : book.price > 300 ? "📖" : "📕";
                const singleBookHtml = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${book.title} — Городская Библиотека</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/book.css">
</head>
<body>
  <header>
    <div class="nav-container">
      <a href="/" class="logo">
        <span class="logo-icon">📚</span> Читальня <span>/ Книга #${book.id}</span>
      </a>
      <nav>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О нас</a></li>
          <li><a href="/books" class="active">Каталог (TS)</a></li>
          <li><a href="/#contacts">Контакты</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="catalog-container">
    <div style="margin-bottom: 2rem;">
      <a href="/books" class="book-button" style="display: inline-flex; align-items: center; gap: 0.5rem; width: auto;">
        ← Назад до каталогу
      </a>
    </div>

    <div class="book-card" style="max-width: 600px; margin: 0 auto; padding: 2.5rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
      <div class="book-cover" style="font-size: 4rem; margin-bottom: 1.5rem;">${coverEmoji}</div>
      <span style="font-size: 0.85rem; color: var(--emerald-light); font-weight: 700; letter-spacing: 1px; margin-bottom: 0.5rem;">ID КНИГИ: #${book.id}</span>
      <h1 class="book-tytle" style="font-size: 2.2rem; margin-bottom: 1rem;">${book.title}</h1>
      <p class="book-price" style="font-size: 1.8rem; justify-content: center; margin-bottom: 1.5rem;">${book.price} <span>грн</span></p>
      <span class="book-status ${book.is_active ? "active" : ""}" style="font-size: 1rem; padding: 0.5rem 1.2rem; margin-bottom: 2rem;">
          ${book.is_active ? "● В наявності" : "✕ Немає"}
      </span>
      <p style="color: var(--text-muted); margin-bottom: 2rem;">Чудове видання з нашої бібліотечної колекції. Ви можете замовити його прямо зараз або зарезервувати для читання у нашому залі.</p>
      <a href="/books" class="book-button" style="width: 100%; max-width: 300px;">
          ${book.is_active ? "Замовити книгу" : "Повідомити про наявність"}
      </a>
    </div>
  </main>

  <footer>
    <p>© 2026 Міська Біблиотека «Читальня». Динамічний розділ Node.js + TypeScript.</p>
  </footer>
</body>
</html>`;
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.write(singleBookHtml);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.write(`<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Книгу не знайдено</title>
  <link rel="stylesheet" href="/book.css">
</head>
<body style="display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; text-align:center;">
  <h1 style="font-size:3rem; margin-bottom:1rem;">404</h1>
  <h2>Книгу з ID #${bookId} не знайдено</h2>
  <p style="margin: 1.5rem 0;"><a href="/books" class="book-button">Повернутися до каталогу</a></p>
</body>
</html>`);
            }
        } else if (pathname === '/books') {
            const cardsHtml = books.map(book => showBooks(book)).join('');
            const pageHtml = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог книг — Городская Библиотека</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/book.css">
</head>
<body>
  <header>
    <div class="nav-container">
      <a href="/" class="logo">
        <span class="logo-icon">📚</span> Читальня <span>/ Каталог</span>
      </a>
      <nav>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О нас</a></li>
          <li><a href="/books" class="active">Каталог (TS)</a></li>
          <li><a href="/#contacts">Контакты</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="catalog-container">
    <div class="catalog-header">
      <h1>Динамічний каталог книг</h1>
      <p>Книги, згенеровані TypeScript сервером у реальному часі</p>
    </div>

    <div class="books-wrapper">
      ${cardsHtml}
    </div>
  </main>

  <footer>
    <p>© 2026 Міська Біблиотека «Читальня». Динамічний розділ Node.js + TypeScript.</p>
  </footer>
</body>
</html>`;

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write(pageHtml);
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write("<h1>404 Page Not Found</h1>");
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write("<h1>404 Page Not Found</h1>");
    }

    res.end();
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})