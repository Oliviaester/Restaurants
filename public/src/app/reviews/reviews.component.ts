import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurant: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
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
  newButton(){
    this._router.navigate(['/restaurants',this.restaurant._id,"review"])
  }

}
