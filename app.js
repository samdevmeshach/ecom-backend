const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const categoryRoutes = require("./routes/category")
const orderRoutes = require("./routes/order")
const expressValidator = require("express-validator")

require("dotenv").config()
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(() => console.log("DB conected"))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())


//Routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`working on port ${port}`);
})