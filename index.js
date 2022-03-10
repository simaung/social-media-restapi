const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");

dotenv.config();

const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true },
    () => {
        console.log("Connected to MongoDB");
    });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Backend server is running in port:${PORT}`);
})