import express from "express"
import "dotenv/config"
import path from "node:path"
import bookRoutes from "./routes/bookRoutes.js"

const PORT = process.env.PORT || 3200
const HOST = process.env.HOST || "http://localhost"

const app = express()
app.use(express.json()) //body -> json

app.use(express.static(path.join(process.cwd(), "src", "styles")))
app.use(express.static(path.join(process.cwd(), "src", "pages")))

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "src", "pages", "index.html"))
})

app.use('/books', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server has been started ${HOST}:${PORT}`)
})
