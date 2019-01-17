import {ProductModel} from '../../models/ProductModel';
import {CardModel} from '../../models/CardModel';

export function sortBySeqNo(e1: ProductModel | CardModel, e2: ProductModel | CardModel) {
    return e1.id - e2.id;
}


