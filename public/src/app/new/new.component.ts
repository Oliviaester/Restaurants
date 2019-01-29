import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  errors: any;
  nameError: string;
  cuisineError: string;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newRestaurant = { name: "", cuisine: "" }
    this.nameError = "";
    this.cuisineError =  "";
  }

  cancelButton(){
    this._router.navigate(['/restaurants'])
  }
  registerButton(){
    this._httpService.createRestaurant(this.newRestaurant)
    .subscribe(data=>{
      if(data['error']){
        console.log("error", data);
        this.errors = data["error"];
      }else{
        console.log("success!",data)
        this.errors = undefined;
        this.newRestaurant = { name:"", cuisine: ""}
        this.cancelButton();
      }
    })
  }
  nameOnKeyUp(event){
    if ( this.newRestaurant.name.length < 3 ){
      this.nameError = "Name must be at least three characters"
    }else{
      this.nameError = "";
    }
  }
  cuisineOnKeyUp(event){
    if( this.newRestaurant.cuisine.length < 3){
      this.cuisineError = "Cuisine must be at least three characters"
    }else{
      this.cuisineError = "";
    }
  }
}
