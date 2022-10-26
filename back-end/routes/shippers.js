var router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM shippers', (error, result) => {
        if (error) {
            console.log("failed to load shippers");
            throw error;
        }
        let data = JSON.stringify(result);
        res.end(data);
    });
});

router.post('/add', (req, res) => {
    let cmd = 'INSERT INTO shippers SET ?'
    conn.query(cmd, req.body, (error, result) => {
        if (error) {
            console.log("Failed to insert Shipper");
            throw error;
        }
        res.end();
    });
});

router.put('/update/:id', (req, res) => {
    let cmd = 'UPDATE shippers SET ? WHERE ID = ?';
    conn.query(cmd, [req.body, req.params.id], (error, result) => {
        if (error) {
            console.log("failed to update from shippers");
            throw error;
        }
        res.end();
    });
});

router.delete('/delete/:id', (req, res) => {
    let cmd = 'DELETE FROM shippers WHERE ID = ?';
    conn.query(cmd, req.params.id, (error, result) => {
        if (error) {
            console.log("failed to delete from shippers");
            throw error;
        }
        res.end();
    });
});

module.exports = router;