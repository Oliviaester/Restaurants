import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurant: any;
  newReview: any;
  nameError: string;
  reviewError: string;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newReview = { name: "", stars: 1, review: ""};
    this.nameError= "";
    this.reviewError = "";
    this._route.parent.params.subscribe((params: Params)=>{
      this.getRestaurantFromService(params['id']);
    })
  }

  getRestaurantFromService(id: string){
    this._httpService.getRestaurant({_id: id})
    .subscribe(data=>{
      if(data['error']){
        console.log("error",data)
      }else{
        console.log("success",data)
        this.restaurant = data['data'];
        this.restaurant.reviews.sort((a,b)=>{return b["stars"]-a["stars"]})
      }
    })
  }
  cancelButton(){
    this._router.navigate(['/restaurants',this.restaurant._id]);
  }
  nameOnKeyUp(event){
    if ( this.newReview.name.length < 3){
      this.nameError = "Name must be at least three characters in length."
    }else{
      this.nameError = "";
    }
  }
  reviewOnKeyUp(event){
    if( this.newReview.review.length < 3){
      this.reviewError = "Description must be at least three characters in length."
    }else{
      this.reviewError = "";
    }
  }
  submitButton(){
    this._httpService.addReview(this.restaurant, this.newReview)
    .subscribe(data=>{
      if(data['error']){
        console.log("error",data)
        this.errors = data['error'];
      }else{
        console.log("success!",data)
        this.errors = undefined;
        this.newReview = { name: "", stars: 1, review: ""};
        this.cancelButton();
      }
    })
  }
}
