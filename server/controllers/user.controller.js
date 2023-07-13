const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async(req, res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                res.status(400).json({errors: {email: {message: "That email already exists, please login."}}})
            } else{
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, secret, {expiresIn:'2h'})
                console.log(userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json({error: err})
            console.log(err);
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(user);
                }            
                else{
                    res.status(400).json( {errors: {password: {message: "Invalid email/password"}}});
                }
            }

        else {
            res.status(400).json( {errors: {password: {message: "Invalid email/password"}}})
            }
        }

        catch(err){
            res.status(400).json({error: err})
            console.log(err);
        }
    },

    logout: (req, res) => {
        res.clearCookie('userToken').json({message: 'You logged out.'})
    },

    getAllUsers: (req, res) => {
        User.find({})
            .then(allUsers => res.json({users: allUsers}))
            .catch(err => res.json({message: "Something went wrong", error: err}));
        
    }

}