import {ProductsService} from './products.service';
import {OrderService} from './order.service';

export const services: any[] = [ProductsService, OrderService];

export * from './products.service';
export * from './order.service';
