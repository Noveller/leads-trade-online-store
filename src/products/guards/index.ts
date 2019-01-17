import {ProductsGuardService} from './products-guard.service';
import {CardGuardService} from './card-guard.service';

export const guards: any[] = [ProductsGuardService, CardGuardService];

export * from './products-guard.service';
export * from './card-guard.service';
