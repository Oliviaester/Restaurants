var restaurants = require('./../controllers/restaurants');
var path = require('path');

module.exports = (app)=>{
    app.get('/getapi', (req,res)=>{
        restaurants.testforapi(req,res);
    });
    app.get('/r', (req,res)=>{
        restaurants.readRestaurants(req,res);
    });
    app.get('/r/:id', (req,res)=>{
        restaurants.readRestaurant(req,res);
    });
    app.post('/r', (req,res)=>{
        restaurants.createRestaurant(req,res);
    });
    app.delete('/r/:id', (req,res)=>{
        restaurants.deleteRestaurant(req,res);
    });
    app.put('/r/:id', (req,res)=>{
        restaurants.updateRestaurant(req,res);
    });
    app.post('/r/:id', (req,res)=>{
        restaurants.addReview(req,res);
    });
    app.post('/s', (req,res)=>{
        restaurants.saveSession(req,res);
    });
    app.get('/s', (req,res)=>{
        restaurants.getSession(req,res);
    });
    app.delete('/s', (req,res)=>{
        restaurants.eraseSession(req,res);
    })
    app.all("*", (req,res,next)=>{
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}