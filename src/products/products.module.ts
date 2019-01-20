import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './containers/products/products.component';
import {containers} from './containers';

import * as fromGuards from './guards';
import {ShoppingCardComponent} from './containers/shopping-card/shopping-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import {OrderFormComponent} from './containers/order-form/order-form.component';

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.ProductsGuardService, fromGuards.CardGuardService],
    component: ProductsComponent
  },
  {
    path: 'shopping-card',
    canActivate: [fromGuards.CardGuardService],
    component: ShoppingCardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    ModalModule.forRoot(),

    FormsModule,
    ReactiveFormsModule

  ],
  entryComponents: [OrderFormComponent],
  declarations: [
    ...containers
  ],
  providers: [...fromGuards.guards]
})
export class ProductsModule { }
