const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to db
connectDB();

//middleware
app.use(express.json({extended:false}));

//routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/url'));




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>`Server running on  ${PORT}`);