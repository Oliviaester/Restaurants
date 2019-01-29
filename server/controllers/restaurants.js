var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

module.exports = { 
    readRestaurants: (req,res)=>{
        Restaurant.find({}, (err,restaurants)=>{
            if(err){
                res.json({message:"error",error:err})
            }else{
                res.json({message:"success",data:restaurants})
            }
        })
    },
    readRestaurant: (req,res)=>{
        Restaurant.findOne({_id: req.params.id}, (err,restaurant)=>{
            if(err){
                res.json({message:"error",error:err})
            }else{
                res.json({message:"success",data:restaurant})
            }
        })
    },
    createRestaurant: (req,res)=>{
        Restaurant.find({name: req.body.name}, (err,restaurants)=>{
            if(err){
                res.json({message:"error",error:err})
            }else{
                if ( restaurants.length > 0){
                    res.json({message:"error",error:"Restaurant already exists"})
                }else{
                    Restaurant.create(req.body, (err,data)=>{
                        if(err){
                            res.json({message:"error",error:err})
                        }else{
                            res.json({message:"success",data:data})
                        }
                    })
                }
            }
        })
    },
    deleteRestaurant: (req,res)=>{
        Restaurant.deleteOne({_id: req.params.id}, (err,data)=>{
            if(err){
                res.json({message:"error",error:err})
            }else{
                res.json({message:"success",data:data})
            }
        })
    },
    updateRestaurant: (req,res)=>{
        Restaurant.findOne({_id: req.params.id}, (err,restaurant)=>{
            if(err){
                res.json({message:"error", error:err})
            }else{
                restaurant.name = req.body['name'];
                restaurant.cuisine = req.body['cuisine'];
                restaurant.save(err=>{
                    if(err){
                        res.json({message:"error",error:err})
                    }else{
                        res.json({message:"success"})
                    }
                })
            }
        })
    },
    addReview: (req,res)=>{
        var errors = {};
        if ( !req.body['name']){
            errors['name'] = "Enter a name"
        }else{
            if( req.body.name.length < 3){
                errors['name'] = "name must be at least 3 chars"
            }
        }
        if ( !req.body['stars']){
            errors['stars'] = "No stars"
        }else{
            if( req.body.stars < 1 || req.body.stars > 5){
                errors['stars'] = "invalid stars"
            }
        }
        if( !req.body['review']){
            errors['review'] = "enter a review"
        }else{
            if ( req.body.review.length < 3){
                errors['review'] = "review must be at least 3 chars"
            }
        }
        if (Object.keys(errors).length>0){
            res.json({message:"error",error:errors})
        }else{
            Restaurant.update({_id: req.params.id}, { $push: { reviews: req.body}}, (err,data)=>{
                if(err){
                    res.json({message:"error",error:err})
                }else{
                    res.json({message:"success",data:data})
                }
            })
        }
    },
    saveSession: (req,res)=>{
        req.session.restaurant_id = req.body._id;
        res.json({message:"success",data:req.session})
    },
    eraseSession: (req,res)=>{
        delete req.session.restaurant_id;
    },
    getSession: ( req,res)=>{
        if( req.session["restaurant_id"]){
            res.json({message:"success", data:req.session.restaurant_id})
        }else{
            res.json({message:"error"})
        }
    }
}