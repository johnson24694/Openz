const HouseController = require('../controllers/house.controller');
// const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/houses',  HouseController.createHouse);
    app.get('/api/houses',  HouseController.getAllHouses);
    app.get('/api/house/:id', HouseController.getOneHouseById);
    app.put('/api/house/:id', HouseController.updateHouse);
    app.delete('/api/house/:id', HouseController.deleteHouse);
}