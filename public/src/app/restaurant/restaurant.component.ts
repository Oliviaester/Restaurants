import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Output() aEventEmitter = new EventEmitter();
  editRestaurant: any;
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
  }


}
