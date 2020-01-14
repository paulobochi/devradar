const express = require("express");
const mongoose = require("mongoose");

const MONGO_URI = 'mongodb://localhost:27017/devradar';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.get('/users/:id', (req, res) => {
    return res.json({ message: req.params.id });
});
app.listen(3333);
