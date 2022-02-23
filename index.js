import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './app/routes/index.js';
import cookieParser from 'cookie-parser';
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize());

const url = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(url)
.then(() => {
    console.log('Database connected');
})
.catch((error) => {
    console.log('Error connecting to database');
});

app.use('/api/', mainRoutes);

app.listen(process.env.PORT, () => {
    console.log('Listening on', process.env.PORT);
});