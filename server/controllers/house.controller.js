const House = require('../models/house.model');

module.exports.createHouse = (req, res) => {
    House.create(req.body) 
        .then((newHouse) => {
            res.json({ newHouse });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
    };

module.exports.getAllHouses = (req, res) => {
    House.find({})
        .then(allHouses => {
            console.log(allHouses);
            res.json(allHouses);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getOneHouseById = (req, res) => {
    House.findOne({_id:req.params.id})
        .then(house => res.json(house))
        .catch(err => res.json(err));
}

module.exports.updateHouse = (req, res) => {
    House.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedHouse => res.json(updatedHouse))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteHouse = (req, res) => {
    House.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}