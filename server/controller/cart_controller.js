const swag = require('../models/swag');

module.exports = {

    add: function (req, res, next) {
        let { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex(swag => swag.id == id)

        if (index === -1) {
            let selectedSwag = swag.find(swag => swag.id == id);
            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }
        res.status(200).send(req.session.user)
    },

    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;

        let selectedSwag = swag.find(swag => swag.id == id);

        if (selectedSwag) {
            const i = cart.findIndex(swag => swag.id == id);
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    checkout: function (req, res, next) {
        let { user } = req.session;

        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);
    }
}