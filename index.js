const express = require('express')
const conn = require('./db')
const router = require('./routes/index')

const PORT = 5000

const app = express()


app.use(express.json())
app.use('/', router)


const start = () => {
    try {
        conn.connect(err => {
            if (err) {
                console.log(err)
            } else {
                console.log("DB connection success")
            }
        })
        app.listen(PORT, () => {
            console.log("Server working on port " + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
