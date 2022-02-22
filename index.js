import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import mainRoutes from './app/routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017')
.then(() => {
    console.log('Database connected');
})
.catch((error) => {
    console.log('Error connecting to database');
});

app.use('/api/', mainRoutes);
// TODO remove this routes when connecting react
app.use('/update', (req, res) => {
    res.sendFile(path.resolve('app/views/updatePost.html'));
});

app.use('/', (req, res) => {
    res.sendFile(path.resolve('app/views/createPost.html'));
});
//////////////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log('Listening on', process.env.PORT);
});