import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  restaurant: any;
  errors: any;
  nameError: string;
  cuisineError: string;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.restaurant = _httpService.editRestaurant
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getRestaurantFromService(params['id'])
    })
    this.nameError = "";
    this.cuisineError = "";
  }

  getRestaurantFromService(id: string){
    this._httpService.getRestaurant({_id:id})
    .subscribe(data=>{
      if(data['error']){
        console.log("error",data)
      }else{
        this.restaurant = data['data']
      }
    })
  }
  cancelButton(){
    this._httpService.editRestaurant = undefined;
    this._router.navigate(['/restaurants'])
  }
  editButton(){
    this._httpService.updateRestaurant(this.restaurant)
    .subscribe(data=>{
      if(data['error']){
        console.log("error", data)
        this.errors = data['error']
      }else{
        console.log("success!",data)
        this._httpService.editRestaurant = undefined;
        this.errors = undefined;
        this.cancelButton();
      }
    })
  }
  nameOnKeyUp(event){
    if ( this.restaurant.name.length < 3 ){
      this.nameError = "Name must be at least three characters"
    }else{
      this.nameError = "";
    }
  }
  cuisineOnKeyUp(event){
    if( this.restaurant.cuisine.length < 3){
      this.cuisineError = "Cuisine must be at least three characters"
    }else{
      this.cuisineError = "";
    }
  }

}
