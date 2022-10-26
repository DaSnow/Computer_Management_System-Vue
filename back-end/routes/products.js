var router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM products', (error, result) => {
        if (error) {
            console.log("failed to load products");
            throw error;
        }
        let data = JSON.stringify(result);
        res.end(data);
    });
});

router.post('/add', (req, res) => {
    let cmd = 'INSERT INTO products SET ?'
    conn.query(cmd, req.body, (error, result) => {
        if (error) {
            console.log("Failed to insert Product");
            throw error;
        }
        res.end();
    });
});

router.put('/update/:id', (req, res) => {
    let cmd = 'UPDATE products SET ? WHERE ID = ?';
    conn.query(cmd, [req.body, req.params.id], (error, result) => {
        if (error) {
            console.log("failed to update from products");
            throw error;
        }
        res.end();
    });
});

router.delete('/delete/:id', (req, res) => {
    let cmd = 'DELETE FROM products WHERE ID = ?';
    conn.query(cmd, req.params.id, (error, result) => {
        if (error) {
            console.log("failed to delete from products");
            throw error;
        }
        res.end();
    });
});

module.exports = router;