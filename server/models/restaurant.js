var mongoose = require('mongoose');
var RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    cuisine: { type: String, required: true, minlength: 3},
    reviews: [
        {name: { type: String, required: true, minlength: 3},
        stars: { type: Number, required: true},
        review: { type: String, required: true, minlength: 3}}
    ]
}, {timestamps: true});
mongoose.model('Restaurant', RestaurantSchema)