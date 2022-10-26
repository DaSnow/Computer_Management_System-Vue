var router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM suppliers', (error, result) => {
        if (error) {
            console.log("failed to load suppliers");
            throw error;
        }
        let data = JSON.stringify(result);
        res.end(data);
    });
});

router.post('/add', (req, res) => {
    let cmd = 'INSERT INTO suppliers SET ?'
    conn.query(cmd, req.body, (error, result) => {
        if (error) {
            console.log("Failed to insert Supplier");
            throw error;
        }
        res.end();
    });
});

router.put('/update/:id', (req, res) => {
    let cmd = 'UPDATE suppliers SET ? WHERE ID = ?';
    conn.query(cmd, [req.body, req.params.id], (error, result) => {
        if (error) {
            console.log("failed to update from suppliers");
            throw error;
        }
        res.end();
    });
});

router.delete('/delete/:id', (req, res) => {
    let cmd = 'DELETE FROM suppliers WHERE ID = ?';
    conn.query(cmd, req.params.id, (error, result) => {
        if (error) {
            console.log("failed to delete from suppliers");
            throw error;
        }
        res.end();
    });
});

module.exports = router;