import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {CustomSerializer, metaReducers, reducerProvider, TOKEN} from './store/reducers';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {services} from './services/index';
import {interceptors} from './services/interceptors/index';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './store/effects/index';
import {containers} from './containers/index';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import {NotifierModule} from 'angular-notifier';
import {config} from './notifier.config';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: '../products/products.module#ProductsModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ...containers
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    EffectsModule.forRoot([...effects]),
    StoreModule.forRoot(TOKEN, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    NotifierModule.withConfig(config)
  ],
  providers: [
    ...services,
    ...interceptors,
    ...reducerProvider,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
