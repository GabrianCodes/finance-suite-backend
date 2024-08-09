// [SECTION] Dependencies and Modules

const express = require("express");
const mongoose = require("mongoose");

// Allows our backend application to be available to our frontend application
// Allow us to control the app's "Cross Origin Resource Sharing" settings.
const cors = require("cors");

// [SECTION] Routes
// Allows access to routes defined within our application
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");


// [SECTION] Environment Setup
const port = 4008;

// [SECTION] Server Setup
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Allow all resources to access our backend application
app.use(cors());


// [SECTION] Database Connection
// Connect to our MongoDB database
mongoose.connect("mongodb+srv://gabrianDB:1xTOseVzLm7IFIGp@atlascluster.qvoxy99.mongodb.net/csp2-b385-sarmiento-lozano?retryWrites=true&w=majority&appName=Cluster0");

// Prompt a message in the terminal once the connection is "open"
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


// [SECTION] Backend Routes

// http://localhost:4000/users
// Defines the "/users" string to be included for all user routes defined in the "user" router file.
// Groups all routes in userRoutes under "/users"
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);



// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(port, () => console.log(`API is now online on port ${port}`))
}

module.exports = { app, mongoose };

// Nice code