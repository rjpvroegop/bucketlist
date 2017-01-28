import {ItemRepository} from "../repository/item-repository";
import {itemValidation} from '../validation/item-validation';

export class ItemService {
    constructor() {
        this.itemRepository = new ItemRepository();
    }

    async getItems(req, res) {
        try {
            let items = await this.itemRepository.getItems();
            res.json(items);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async getItem(req, res) {
        try {
            const id = req.params.item_id;

            let item = await this.itemRepository.getItem(id);
            res.json(item);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async insertItem(req, res) {
        try {
            const model = req.body;

            let modelValidationState = itemValidation(model);
            if (modelValidationState.error) {
                this.sendError(modelValidationState, res);
            }

            let response = await this.itemRepository.insertItem(model);
            res.json(response);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async updateItem(req, res) {
        try {
            const id = req.params.item_id;
            const model = req.body;

            let response = await this.itemRepository.updateItem(id, model);
            res.json(response);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async deleteItem(req, res) {
        try {
            const id = req.params.item_id;

            let response = await this.itemRepository.deleteItem(id);
            res.send(response);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    sendError(err, res) {
        if (err) {
            if (err.databaseError) {
                res.status(500).send(err);
            } else {
                res.status(400).send(err);
            }
        } else {
            res.status(500).end();
        }
    }
}
