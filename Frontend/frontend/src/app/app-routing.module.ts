import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: "customer-details",
    component: CustomerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
