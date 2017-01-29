import {BucketlistItem} from '../model/item-model';
import {Database} from '../../database/database';

export class ItemRepository extends Database {
    constructor() {
        super(BucketlistItem);
    }
}