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

        res.status(200).json("done");
    });
});

app.get("/items/done/:id", (req, res) => {

    const id = req.params.id;

    const sql = "UPDATE items SET done = 'true' WHERE id = $1;";

    pool.query(sql, [id], (error, results) => {

        if (error) throw error

        res.status(200).json("done");
    });
});

app.get("/items/todo/:id", (req, res) => {

    const id = req.params.id;

    const sql = "UPDATE items SET done = 'false' WHERE id = $1;";

    pool.query(sql, [id], (error, results) => {

        if (error) throw error

        res.status(200).json("done");
    });
});

app.get("/items/delete/:id", (req, res) => {

    const id = req.params.id;
    
    const sql = "DELETE FROM items WHERE id = $1;";

    pool.query(sql, [id], (error, results) => {

        if (error) throw error

        res.status(200).json("done");
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
