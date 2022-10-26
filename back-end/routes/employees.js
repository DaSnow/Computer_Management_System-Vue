var router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM employees', (error, result) => {
        if (error) {
            console.log("failed to load employees");
            throw error;
        }
        let data = JSON.stringify(result);
        res.end(data);
    });
});

router.post('/add', (req, res) => {
    let cmd = 'INSERT INTO employees SET ?'
    conn.query(cmd, req.body, (error, result) => {
        if (error) {
            console.log("Failed to insert Employee");
            throw error;
        }
        res.end();
    });
});

router.put('/update/:id', (req, res) => {
    let cmd = 'UPDATE employees SET ? WHERE ID = ?';
    conn.query(cmd, [req.body, req.params.id], (error, result) => {
        if (error) {
            console.log("failed to update from employees");
            throw error;
        }
        res.end();
    });
});

router.delete('/delete/:id', (req, res) => {
    let cmd = 'DELETE FROM employees WHERE ID = ?';
    conn.query(cmd, req.params.id, (error, result) => {
        if (error) {
            console.log("failed to delete from employees");
            throw error;
        }
        res.end();
    });
});

module.exports = router;