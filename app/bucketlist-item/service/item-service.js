import {ItemRepository} from "../repository/item-repository";
import {itemValidation} from '../validation/item-validation';

export class ItemService {
    constructor() {
        this.itemRepository = new ItemRepository();
    }

    async getItems(req, res) {
        try {
            let items = await this.itemRepository.getItems();
            res.status(200).json(items);
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async getItem(req, res) {
        try {
            const id = req.params.item_id;

            let item = await this.itemRepository.getItem(id);
            res.status(200).json(item);
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
            res.status(201).json({url:this.urlBuilder(req) + response.id});
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async updateItem(req, res) {
        try {
            const id = req.params.item_id;
            const model = req.body;

            await this.itemRepository.updateItem(id, model);
            res.status(200).json({url:this.urlBuilder(req)});
        } catch (err) {
            this.sendError(err, res);
        }
    }

    async deleteItem(req, res) {
        try {
            const id = req.params.item_id;

            await this.itemRepository.deleteItem(id);
            res.status(204).end();
        } catch (err) {
            this.sendError(err, res);
        }
    }

    sendError(err, res) {
        if (err) {
            if (err.databaseError) {
                res.status(500).send(err);
            } else {
                res.status(400).json(err);
            }
        } else {
            res.status(500).end();
        }
    }

    urlBuilder(req){
        const protocol = req.protocol + "://";
        const host = req.get('host');
        const path = req.originalUrl;

        return protocol + host + path;
    }
}
