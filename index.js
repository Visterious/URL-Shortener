const app = require('./server')
const conn = require('./db')

const PORT = 5000

const start = () => {
    try {
        conn.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                const query = `
        CREATE TABLE IF NOT EXISTS urls (
          id INT PRIMARY KEY AUTO_INCREMENT,
          full_url VARCHAR(200),
          short_url VARCHAR(50)
        );
        `
                conn.query(query, (err) => {
                    if (err) console.log(err)
                })
                console.log('DB connection success')
            }
        })
        app.listen(PORT, () => {
            console.log('Server working on port ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
