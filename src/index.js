const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose, connect } = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3001
dotenv.config()

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect database success!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () =>{
    console.log('Server is running in port: ', + port)
})
