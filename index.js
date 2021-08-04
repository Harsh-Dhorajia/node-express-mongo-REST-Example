const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// server running
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port ' + port));

// mongodb connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) {
        console.log(`err`, err)
    }
    console.log("Mongodb Connected");
});

const router = express.Router();
require('./routes/notes')(app);

app.get('/', function (req, res) {
    res.json({
        message: 'Hello, World'
    });
});
