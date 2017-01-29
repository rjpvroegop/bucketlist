import {ItemService} from "../service/item-service";

export class ItemResource {
    router;

    constructor(router) {
        this.router = router;
        this.itemService = new ItemService();
        this.setupRoutes();
    }

    setupRoutes() {
        // on routes that end in /bears
        this.router.route('/v1/items')
            .post((req, res) => this.itemService.insertItem(req, res))
            .get((req, res) => this.itemService.getItems(req, res));

        this.router.route('/v1/items/:item_id')
            .get((req, res) => this.itemService.getItem(req, res))
            .put((req, res) => this.itemService.updateItem(req, res))
            .delete((req, res) => this.itemService.deleteItem(req, res))
    }
}
