export class ItemValidation{
    static validate(object){
        let response = {
            error: false,
            message: "An error occured inserting this model.",
            messages: []
        };

        if (object.title == undefined) {
            response.error = true;
            response.messages.push("No title is set for this item.");
        }
        return response;
    }
}