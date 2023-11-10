# API Spec

[Postman](https://www.postman.com/wefallinlovewithppl/workspace/hangry-case-study/collection/14485136-b17e1b6b-1f3a-4f2f-821a-becef08fdd16?action=share&creator=14485136)

## MENU

**1. Add**

Add a new record of menu item.

Endpoint: POST `/api/menus/add`

Request body:

```json
{
  "name": "Menu 1",
  "price": 10000,
  "image": "imageofmenu1.com",
  "description": "This is menu 1",
  "availability": 10
}
```

Response body success:

```json
{
  "data": {
    "name": "Menu 1",
    "price": 10000,
    "image": "imageofmenu1.com",
    "description": "This is menu 1",
    "availability": 10
  }
}
```

Response body error:

If given request body is invalid

```json
{
  "errors": "\"name\" is required. \"price\" is required. \"image\" is required. \"description\" is required. \"availability\" is required"
}
```

**2. Get**

Return the data of a menu item.

Endpoint: GET `/api/menus/{menuId}`

Response body success:

```json
{
  "data": {
    "name": "Menu 1",
    "price": 10000,
    "image": "imageofmenu1.com",
    "description": "This is menu 1",
    "availability": 10
  }
}
```

Response body error:

If given {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If menu item with given {menuId} does not exist

```json
{
  "errors": "Menu with id {menuId} is not found."
}
```

**3. Edit**

Edit the data (name, price, image, description, or availability) of a menu item.

Endpoint: PUT `/api/menus/edit/{menuId}`

Request body:

```json
{
  "name": "Menu 1 edited",
  "price": 20000,
  "image": "imageofmenu1edited.com",
  "description": "This is menu 1 edited",
  "availability": 20
}
```

Response body success:

```json
{
  "data": {
    "name": "Menu 1 edited",
    "price": 20000,
    "image": "imageofmenu1edited.com",
    "description": "This is menu 1 edited",
    "availability": 20
  }
}
```

Response body error:

If given {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If menu item with given {menuId} does not exist

```json
{
  "errors": "Menu with id {menuId} is not found."
}
```

If given request body is invalid

```json
{
  "errors": "\"name\" length must be less than or equal to 100 characters long. \"image\" length must be less than or equal to 500 characters long. \"description\" length must be less than or equal to 200 characters long"
}
```

**4. Remove**

Remove a menu item record.

Endpoint: DELETE `/api/menus/remove/{menuId}`

Response body success:

```json
{
  "data": "Menu with id {menuId} is removed."
}
```

Response body error:

If given {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If menu item with given {menuId} does not exist

```json
{
  "errors": "Menu with id {menuId} is not found."
}
```

**5. Get All**

Return data of all menu item.

Endpoint: GET `/api/menus`

Response body success:

```json
{
  "data": [
    {
      "name": "Menu 1",
      "price": 10000,
      "image": "imageofmenu1.com",
      "description": "This is menu 1",
      "availability": 10
    },
    {
      "name": "Menu 2",
      "price": 20000,
      "image": "imageofmenu2.com",
      "description": "This is menu 2",
      "availability": 20
    }
  ]
}
```

## Cart

**1. Add Item**

Add a menu item to cart.

If there is already a cart with ACTIVE status, add the menu item to the cart. If there is no cart with ACTIVE status, create a new cart (by default the status will be ACTIVE) then add the menu item to the cart.

Endpoint: POST `/api/carts/add/menu/{menuId}`

Request body:

```json
{
  "quantity": 1,
  "notes": "No sugar no ice"
}
```

Response body success:

```json
{
  "data": {
    "id": 1,
    "quantity": 1,
    "notes": "No sugar no ice",
    "menu_id": 1,
    "cart_id": 1
  }
}
```

Response body error:

If given {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If menu item with given {menuId} does not exist

```json
{
  "errors": "Menu with id {menuId} is not found."
}
```

If given request body is invalid

```json
{
  "errors": "\"quantity\" is required"
}
```

**2. Edit Item**

Edit the data (quantity or notes) of a cart item in cart.

if the quantity is set to 0, the cart item will be removed from the cart.

Endpoint: PUT `/api/carts/edit/{cartId}/menu/{menuId}`

Request body:

```json
{
  "quantity": 2,
  "notes": "Less sugar less ice"
}
```

Response body success:

If quantity is set to more than 0

```json
{
  "data": {
    "id": 1,
    "quantity": 2,
    "notes": "Less sugar less ice",
    "menu_id": 1,
    "cart_id": 1
  }
}
```

If quantity is set to 0

```json
{
  "data": "Cart item is removed."
}
```

Response body error:

If given {cartId} or {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If cart item with given {cartId} and {menuId} does not exist

```json
{
  "errors": "Cart item is not found."
}
```

If given request body is invalid

```json
{
  "errors": "\"notes\" length must be less than or equal to 100 characters long"
}
```

**3. Remove Item**

Remove a cart item from cart.

Endpoint: DELETE `/api/carts/remove/{cartId}/menu/{menuId}`

Response body success:

```json
{
  "data": "Cart item is removed."
}
```

Response body error:

If given {cartId} or {menuId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If cart item with given {cartId} and {menuId} does not exist

```json
{
  "errors": "Cart item is not found."
}
```

**4. Get**

Return data of cart including the cart items.

Endpoint: GET `/api/carts/{cartId}`

Response body success:

```json
{
  "data": {
    "id": 1,
    "status": "ACTIVE",
    "total": 50000,
    "created_at": "2023-11-09T23:49:23.897Z",
    "modified_at": "2023-11-09T23:50:58.610Z",
    "cart_items": [
      {
        "id": 1,
        "quantity": 1,
        "notes": "No sugar no ice",
        "menu_id": 1,
        "cart_id": 1
      },
      {
        "id": 2,
        "quantity": 2,
        "notes": null,
        "menu_id": 2,
        "cart_id": 1
      }
    ]
  }
}
```

Response body error:

If given {cartId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If cart with given {cartId} does not exist

```json
{
  "errors": "Cart with id {cartId} is not found."
}
```

## Order

**1. Checkout**

Checkout cart to become an order.

The cart will be updated to INACTIVE status and the created order by default will have WAITING_CONFIRMATION status.

If there is on going order, user can not make another order unless they complete or cancel the order.

Endpoint: POST `/api/carts/checkout/{cartId}`

Request body:

```json
{
  "destination_address": "Jl. ABC No. 1"
}
```

Response body success:

```json
{
  "data": {
    "id": 1,
    "status": "WAITING_CONFIRMATION",
    "total": 50000,
    "destination_address": "Jl. ABC No. 1",
    "created_at": "2023-11-10T01:04:17.314Z",
    "modified_at": "2023-11-10T01:04:17.314Z",
    "order_items": [
      {
        "id": 1,
        "name": "Menu 1",
        "price": 10000,
        "image": "imageofmenu1.com",
        "description": "This is menu 1",
        "quantity": 1,
        "notes": "No sugar no ice",
        "menu_id": 1,
        "order_id": 1
      },
      {
        "id": 2,
        "name": "Menu 2",
        "price": 20000,
        "image": "imageofmenu2.com",
        "description": "This is menu 2",
        "quantity": 2,
        "notes": null,
        "menu_id": 2,
        "order_id": 1
      }
    ]
  }
}
```

Response body error:

If given {cartId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If cart with given {cartId} does not exist

```json
{
  "errors": "Cart with id {cartId} is not found."
}
```

If cart with given {cartId} has INACTIVE status

```json
{
  "errors": "Cart with id 1 is inactive."
}
```

If given request body is invalid

```json
{
  "errors": "\"destination_address\" length must be less than or equal to 500 characters long"
}
```

If there is on going order

```json
{
  "errors": "You have an on going order. Please complete the order before you make another one."
}
```

**2. Update Status**

Update status of an order.

Available status:

- WAITING_CONFIRMATION: wait for confirmation from the restaurant. can be updated to IN_COOKING or CANCELLED status
- IN_COOKING: order is confirmed and in cooking. can be updated to IN_DELIVERY status only
- IN_DELIVERY: order is cooked and in delivery to destination. can be updated to DONE status only
- DONE: order is delivered to the destination. can be updated from IN_DELIVERY status only
- CANCELLED: order is cancelled. can be updated from WAITING_CONFIRMATION status only

Endpoint: PUT `/api/orders/update-status/{orderId}`

Request body:

```json
{
  "status": "IN_COOKING"
}
```

Response body success:

```json
{
  "data": {
    "id": 1,
    "status": "IN_COOKING",
    "total": 50000,
    "destination_address": "Jl. ABC No. 1",
    "created_at": "2023-11-10T01:04:17.314Z",
    "modified_at": "2023-11-10T01:07:17.047Z"
  }
}
```

Response body error:

If given {orderId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If order with given {orderId} does not exist

```json
{
  "errors": "Order with id 3 is not found."
}
```

If given status in request body is invalid

```json
{
  "errors": "Can not update order status from CANCELLED to WAITING_CONFIRMATION."
}
```

**3. Get**

Return the data of an order including the order items.

Endpoint: GET `/api/orders/{orderId}`

Response body success:

```json
{
  "data": {
    "id": 1,
    "status": "WAITING_CONFIRMATION",
    "total": 50000,
    "destination_address": "Jl. ABC No. 1",
    "created_at": "2023-11-10T01:04:17.314Z",
    "modified_at": "2023-11-10T01:04:17.314Z",
    "order_items": [
      {
        "id": 1,
        "name": "Menu 1",
        "price": 10000,
        "image": "imageofmenu1.com",
        "description": "This is menu 1",
        "quantity": 1,
        "notes": "No sugar no ice",
        "menu_id": 1,
        "order_id": 1
      },
      {
        "id": 2,
        "name": "Menu 2",
        "price": 20000,
        "image": "imageofmenu2.com",
        "description": "This is menu 2",
        "quantity": 2,
        "notes": null,
        "menu_id": 2,
        "order_id": 1
      }
    ]
  }
}
```

Response body error:

If given {orderId} is not a number

```json
{
  "errors": "\"value\" must be a number"
}
```

If order with given {orderId} does not exist

```json
{
  "errors": "Order with id 3 is not found."
}
```

---

### For improvement

- Authentication & authorization
- Menu image upload
- Payments
- Branch management
- Unit test
