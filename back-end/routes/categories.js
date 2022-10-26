var router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM categories', (error, result) => {
        if (error) {
            console.log("failed to load categories");
            throw error;
        }
        let data = JSON.stringify(result);
        res.end(data);
    });
});

router.post('/add', (req, res) => {
    let cmd = 'INSERT INTO categories SET ?'
    conn.query(cmd, req.body, (error, result) => {
        if (error) {
            console.log("Failed to insert Category");
            throw error;
        }
        res.end();
    });
});

router.put('/update/:id', (req, res) => {
    let cmd = 'UPDATE categories SET ? WHERE ID = ?';
    conn.query(cmd, [req.body, req.params.id], (error, result) => {
        if (error) {
            console.log("failed to update from categories");
            throw error;
        }
        res.end();
    });
});

router.delete('/delete/:id', (req, res) => {
    let cmd = 'DELETE FROM categories WHERE ID = ?';
    conn.query(cmd, req.params.id, (error, result) => {
        if (error) {
            console.log("failed to delete from categories");
            throw error;
        }
        res.end();
    });
});

module.exports = router;