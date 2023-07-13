const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    name: { type: String,
            required: [true, "You must enter in a house name."],
            minlength: [3, "House name must be at least 3 characters."]
        },
    location: { type: String,
        required: [true, "You must enter in a house location."],
        minlength: [3, "House location must be at least 3 characters."]
    },
    dateOpen: { type: Date,
        required: [true, "You must enter in a date."],
        minlength: [3, "Date must be at least 3 numbers."]
    },
    timeOpen: { type: String,
        required: [true, "You must enter a time."],
        minlength: [2, "Time must be at least 2 numbers."]
    },  
    favorite: { type: Boolean,
    },  

    notes: { type: String,
        
    },  
   },
{timestamps: true });

module.exports = mongoose.model('House', HouseSchema);