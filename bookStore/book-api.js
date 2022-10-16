const path = require('path')
const express = require('express')

//Grabs the http body, decode the information, and append it to the request.body variable
const bodyParser = require('body-parser')

//CORS allows safe interaction between browser and server during request
const cors = require('cors')


const app = express()
const port = 7777

//Container for books can be mongoDB instance
let books = [
    {
        "isbn": "9781449331818",
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "publish_date": "2012-07-01",
        "publisher": "O'Reilly Media",
        "numOfPages": 254,
    },
]

//Apply CORS to application
app.use(cors())


//attach and configure body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/new-book.html'))
})

app.get('/book', (req, res) => {
    res.json(books)
})

app.post('/book', (req, res) => {
    const book  = req.body

    console.log(book)
    books.push(book)

    res.send('Book added to the database.')
})


//Open port and start listening for request
app.listen(port, () => console.log(`Server is running on ${port}`))
