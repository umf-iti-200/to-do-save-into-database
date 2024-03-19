const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Pool = require('pg').Pool

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})

app.post("/items/save", (req, res) => {

    const data = req.body;

    const sql = 'INSERT INTO items (title, done) VALUES ($1, $2)';

    pool.query(sql, [data.title, data.done], (error, results) => {

        if (error) throw error

        // res.status(200).json(results.rows);
        res.send("Done")
    });
});

app.get("/items", function (req, res) {

    const sql = 'SELECT * FROM items';

    pool.query(sql, (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");

});
