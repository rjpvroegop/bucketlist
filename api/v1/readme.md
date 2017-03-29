##API description

* **GET** 
  * `/bucketlist/api/v1/bucketlist`
    * Get a list with all bucketlist items
  * `/bucketlist/api/v1/bucketlist?id={itemId}`
    * Get an item from the bucketlist
  * `/bucketlist/api/v1/bucketlist?list`
    * Get a list with all item ID's
    
* **POST**
  * `/bucketlist/api/v1/bucketlist`
    * Create a new bucketlist item
      * Required fields: `title` - `description` - `image`

* **PUT**
  * `/bucketlist/api/v1/bucketlist`
    * Update a bucketlist item
      * Required fields: `id` and atliest one other field
      
* **DELETE**
  * `/bucketlist/api/v1/bucketlist?id={itemId}`
    * Delete a bucketlist item