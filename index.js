const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const schoolRoute = require('./routes/school');



dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection Successfull!"))
.catch((err) => { console.log(err)});
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/school', schoolRoute);



app.listen(process.env.PORT || 5000, () => {
    console.log('listening on port 5000')
})