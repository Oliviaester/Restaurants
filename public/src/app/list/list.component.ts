import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  restaurants: []
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRestaurantsFromService();
  }
  getRestaurantsFromService(){
    this._httpService.getRestaurants()
    .subscribe(data=>{
      if(data['error']){
        console.log("error",data)
      }else{
        console.log("success",data)
        this.restaurants = data['data']
        // for ( var i=0; i<this.restaurants.length; i++){
        //   var now = new Date();
        //   this.restaurants[i]["delta"] = (new Date() - new Date(this.restaurants[i].createdAt ))/1000;
        // }
      }
    })
  }
  newRestaurantButton(){
    this._router.navigate(['/restaurants','new']);
  }
  deleteButton(restaurant: any){
    this._httpService.deleteRestaurant(restaurant)
    .subscribe(data=>{
      if(data['error']){
        console.log("error",data)
      }else{
        console.log("successfully deleted",data)
        this.getRestaurantsFromService();
      }
    })
  }
  reviewsButton(restaurant: any){
    this._router.navigate(['/restaurants',restaurant._id]);
  }
  updateButton(restaurant: any){
    this._httpService.editRestaurant = restaurant;
    // this._router.navigate(['/restaurants',restaurant._id,'edit'])
  }

}
