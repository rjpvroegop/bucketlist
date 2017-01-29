import {ItemRepository} from "../repository/item-repository";
import {ItemValidation} from '../validation/item-validation';
import {Service} from '../../service/service';

export class ItemService extends Service {
    constructor() {
        super();
        this.itemRepository = new ItemRepository();
    }

    async getItems(req, res) {
        try {
            let items = await this.itemRepository.getAll();
            this.sendOk(res, items, 200);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async getItem(req, res) {
        try {
            const id = req.params.item_id;

            let item = await this.itemRepository.getOne(id);
            this.sendOk(res, item, 200);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async insertItem(req, res) {
        try {
            const model = req.body;
            let modelValidationState = ItemValidation.validate(model);

            if (modelValidationState.error) {
                this.sendError(modelValidationState, res);
            } else {
                try {
                    let item = await this.itemRepository.insertOne(model);
                    let url = this.urlBuilder(req) + item.id;
                    let response = {url};
                    this.sendOk(res, response, 201);
                } catch (err) {
                    this.sendError(err, res);
                }
            }
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async updateItem(req, res) {
        try {
            const id = req.params.item_id;
            const model = req.body;

            await this.itemRepository.updateOne(model, id);
            let url = this.urlBuilder(req);
            let response = {url};
            console.log('ok');
            this.sendOk(res, response, 200);
        } catch (err) {
            console.log('err');
            this.sendError(err, res);
        }
    }

    async deleteItem(req, res) {
        try {
            const id = req.params.item_id;

            await this.itemRepository.deleteOne(id);
            this.sendOk(res, {}, 204);
        } catch (err) {
            this.sendError(err, res);
        }
    }
}
