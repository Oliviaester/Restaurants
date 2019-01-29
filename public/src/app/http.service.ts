import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public editRestaurant: any
  constructor(private _http: HttpClient) { }

  getRestaurants(){
    return this._http.get('/r')
  }
  getRestaurant(restaurant: any){
    return this._http.get(`/r/${restaurant._id}`);
  }
  createRestaurant(restaurant: any){
    return this._http.post('/r', restaurant )
  }
  deleteRestaurant(restaurant: any){
    return this._http.delete(`/r/${restaurant._id}`)
  }
  updateRestaurant(restaurant: any){
    return this._http.put(`/r/${restaurant._id}`, restaurant)
  }
  addReview(restaurant: any, review: any){
    return this._http.post(`/r/${restaurant._id}`, review)
  }
  addSession(restaurant: any){
    return this._http.post('/s', restaurant)
  }
  eraseSession(){
    return this._http.delete('/s')
  }
  getSession(){
    return this._http.get('/s')
  }
}
