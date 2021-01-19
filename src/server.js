const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
//routes
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin/auth');
const authRoutes =  require('./routers/auth');
const adminRoutes =  require('./routers/admin/auth');
const categoryRoutes = require('./routers/category');
const productRoutes = require('./routers/product');
const cartRoutes = require('./routers/cart');
const initialDataRoutes = require('./routers/admin/initData');
const pageRoutes = require('./routers/admin/page');
const addressRoutes = require('./routers/address');
//environment variable or you can say constants
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.nd6mr.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nd6mr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
)
.then(() => {
    console.log('Database connected');
})
.catch(error =>{
    console.log(error);
});

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);
// app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});