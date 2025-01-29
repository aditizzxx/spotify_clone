import express from 'express';
import cors from 'cors';
import {readdirSync} from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config'
import { verifyToken } from './middleware/verifyToken.js';

// const morgan = require('morgan');
// require('dotenv').config();

//create express app
const app = express();

//db
// mongoose.connect(process.env.DATABASE, {
//     userNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
    
//     // session: options && options.session
// }).then(() => console.log("DB CONNECTED"))
// .catch((err) => console.log("DB CONNECTION ERR",err));



//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use((req, res, next) => {
//     console.log("this is my own middleware.");
//     next();
// });
app.use(verifyToken)



//db connection
const connectDB = async () => {
    // console.log(`Connecting to MongoDB with URI: ${process.env.DATABASE}`);
    try {
        const conn = await mongoose.connect(process.env.DATABASE, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB();


//route
readdirSync('./routes').map(async (r) =>{
    // app.use("/api", import(`./routes/${r}`))
    const routeModule = await import(`./routes/${r}`);
    return app.use("/", routeModule.default);
}
);

//port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));