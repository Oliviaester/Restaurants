import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  editRestaurant: any;
  constructor(
    public _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}
  ngOnInit(){
    // this._httpService.getSession().subscribe(data=>{
    //   if(data['data']){
    //     this._httpService.getRestaurant({_id: data['data']})
    //   }else{
    //     this.editRestaurant = undefined;
    //   }
    // })
  }
}
