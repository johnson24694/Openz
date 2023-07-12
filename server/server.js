require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


require('./config/mongoose.config');
require('./config/jwt.config');
const UserRoutes = require('./routes/user.routes')(app);
const Routes = require('./routes/house.routes')(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );