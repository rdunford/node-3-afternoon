const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')

    //  Controllers
    , swag_ctrl = require('./controller/swag_controller')
    , cart_ctrl = require('./controller/cart_controller')
    , srch_ctrl = require('./controller/search_controller')
    , auth = require('./controller/auth_controller')

    //  Middleware
    , checkforSession = require('./middleware/checkForSession')

require('dotenv').config()

let app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkforSession);
app.use(express.static(`${__dirname}/build`));

//  Swag Endpoints
app.get(`/api/swag`, swag_ctrl.read);

//  Auth Endpoints
app.post(`/api/login`, auth.login);
app.post(`/api/register`, auth.register);
app.post(`/api/signout`, auth.signout);
app.get(`/api/user`, auth.getUser);

//  Cart Endpoints
app.post(`/api/cart`, cart_ctrl.add)
app.post(`/api/cart/checkout`, cart_ctrl.checkout)
app.delete(`/api/cart`, cart_ctrl.delete)

//  Search Endpoint
app.get(`/api/seach`, srch_ctrl.search);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`${new Date()} Server listening on: ${PORT}`))