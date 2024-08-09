<!-- NOTE: modify this file based on your project specifications-->
# CSP2 Demo App Overview:
### E-COMMERCE API DOCUMENTATION

**Installation:**

```npm install```

**User Credentials:**
- Admin User:
    - email: admin@mail.com
    - pwd: pass1234
- Dummy Customer:
     - email: customer@mail.com
     - pwd: pass1234
    

**ROUTES:**

***User Resource***

- User Registration (POST)
	- /users/
    - auth token required: NO
    - request body: 
        - firstName (String)
        - lastName (String)
        - email (String)
        - password (String)
        - isAdmin (Boolean)
        - mobileNo (String)

- User Login (POST)
	- /users/login
    - auth token required: NO
    - request body: 
        - email (String)
        - password (String)

- User Details (GET)
  - /users/details
    - auth token required: YES
    - request body:
      - NA

- User (Set As Admin) (PATCH)
  - /users/:userId/set-as-admin
    - auth token required: YES
    - Admin Only
    - request body:
      - NA

- User (Update Password) (PATCH)
  - /users/update-password
    - auth token required: YES
    - request body:
      - newPassword (String)

***Product Resource***

- Create Product (POST)
  - /
    - auth token required: YES
    - Admin Only
    - request body:
      - name (String)
      - description (String)
      - price (String)

- Get All Products (GET)
  - /all
    - auth token required: YES
    - Admin Only
    - request body:
      - NA

- Get All Active Products (GET)
  - /
    - auth token required: NO
    - request body:
      - NA

- Get Single Product (GET)
  - /:productId
    - auth token required: NO
    - request body:
      - NA

- Update Product (PATCH)
  - /:productId
    - auth token required: YES
    - Admin Only
    - request body:
      - name (String)
      - description (String)
      - price (String)

- Archive Product (PATCH)
  - /:productId/archive
    - auth token required: YES
    - Admin Only
    - request body:
      - NA

- Activate Product (PATCH)
  - /:productId/activate
    - auth token required: YES
    - Admin Only
    - request body:
      - NA

- Search Product By Name (POST)
  - /searchByName
    - auth token required: NO
    - request body:
      - name (String)

- Search Product By Price (POST)
  - /searchByPrice
    - auth token required: NO
    - request body:
      - minPrice (Number)
      - maxPrice (Number)

***Cart Resource***

- Get Cart (GET)
  - /get-cart
    - auth token required: YES
    - request body:
      - NA

- Add To Cart (POST)
  - /add-to-cart
    - auth token required: YES
    - request body:
      - productId (String)
      - quantity (Number)

- Update Cart Quantity (POST)
  - /update-cart-quantity
    - auth token required: YES
    - request body:
      - productId (String)
      - quantity (Number)

- Remove from Cart (PATCH)
  - /:productId/remove-from-cart
    - auth token required: YES
    - request body:
      - NA

- Clear Cart (PATCH)
  - /clear-cart
    - auth token required: YES
    - request body:
      - NA

***Order Resource***

- Checkout (POST)
  - /checkout
    - auth token required: YES
    - request body:
      - NA

- My Orders (POST)
  - /my-orders
    - auth token required: YES
    - request body:
      - NA

- All Orders (GET)
  - /all-orders
    - auth token required: YES
    - Admin Only
    - request body:
      - NA