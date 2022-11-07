import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser"
const app = express();
dotenv.config();
const port = process.env.PORT || 5000

// middle-wares
// app.use(cors())
app.use(cookieParser())
app.use(express.json())





mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzoeyti.mongodb.net/booking?retryWrites=true&w=majority`)
    .then(() => console.log('database connection successful'))
    .catch((error) => console.log(error))



app.get("/", (req, res) => {
    res.send("hello first request")
})

// middle-wares
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(port, () => {
    console.log(`server is running ${port}`)
})