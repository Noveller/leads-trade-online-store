import {ProductsEffect} from './products.effect';
import {CardEffect} from './card.effect';
import {RouterEffects} from './router.effect';

export const effects: any[] = [ProductsEffect, CardEffect, RouterEffects];


export *  from './products.effect';
export *  from './card.effect';
