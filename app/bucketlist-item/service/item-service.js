import {Service} from '../../service/service';
import {ItemRepository} from '../repository/item-repository';

export class ItemService extends Service {
    itemRepository = new ItemRepository();

    async getItems(req, res) {
        try {
            let offset = req.query['offset'] || 0;
            let amount = req.query['amount'] || 20;

            let items = await this.itemRepository.find(offset, amount);

            if(items.length > 0) {
                this.sendOk(res, items, 200);
            } else {
                throw new Error("No items found");
            }
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async getItem(req, res) {
        try {
            const bucketlistItemId = req.params.item_id;
            let item = await this.itemRepository.findById(bucketlistItemId);
            if(item != null) {
                this.sendOk(res, item, 200);
            } else {
                throw new Error("Item not found");
            }
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async insertItem(req, res) {
        try {
            const bucketlistItem = req.body;
            let item = await this.itemRepository.create(bucketlistItem);
            let url = this.urlBuilder(req) + '/' + item.id;
            this.sendOk(res, {url}, 201);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async updateItem(req, res) {
        try {
            const bucketlistItemId = req.params.item_id;
            const bucketlistItem = req.body;
            await this.itemRepository.findByIdAndUpdate(bucketlistItemId, bucketlistItem);
            let url = this.urlBuilder(req);
            let response = {url};
            this.sendOk(res, response, 200);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async deleteItem(req, res) {
        try {
            const bucketlistItemId = req.params.item_id;

            await this.itemRepository.findByIdAndRemove(bucketlistItemId);
            this.sendOk(res, {}, 204);
        } catch (err) {
            this.sendError(err, res);
        }
    }
}
