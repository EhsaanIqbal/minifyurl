const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const app = express();

//cors 
app.use(cors());

//connect to db
connectDB();

//middleware
app.use(express.json({extended:false}));

//routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/url'));

//serve static assets 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>`Server running on  ${PORT}`);