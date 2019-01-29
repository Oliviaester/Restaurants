import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component'; 
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: '/restaurants'},
  { path: 'restaurants', component: RestaurantComponent, children: [
    { path: '', component: ListComponent },
    { path: 'new', component: NewComponent },
    { path: ':id/edit', component: EditComponent },
    { path: ':id', component: ViewComponent, children: [
      { path: '', component: ReviewsComponent },
      { path: 'review', component: ReviewComponent }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
