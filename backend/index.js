const express = require("express");

const app = express();
app.use(express.json());

app.get('/users/:id', (req, res) => {
    return res.json({ message: req.params.id });
});
app.listen(3333);
