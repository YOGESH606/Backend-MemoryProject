const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts.js');
const { post } = require('./routes/posts.js');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('heloo to memories api');
})
app.use('/posts', postRoutes);
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`server is running on port:${PORT} and db is connetced`)))
    .catch((error) => console.log(error.message));

