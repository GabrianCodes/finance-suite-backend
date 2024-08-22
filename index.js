// [SECTION] Dependencies and Modules

const express = require("express");
const mongoose = require("mongoose");

// Allows our backend application to be available to our frontend application
// Allow us to control the app's "Cross Origin Resource Sharing" settings.
const cors = require("cors");

// [SECTION] Routes
// Allows access to routes defined within our application
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const incomeRoute = require("./routes/income");
const sourceRoute = require("./routes/source");
const sourceTypeRoute = require("./routes/sourceType");
const dataRoute = require("./routes/data");


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
mongoose.connect("mongodb+srv://gabrianDB:1xTOseVzLm7IFIGp@atlascluster.qvoxy99.mongodb.net/financesuitetest?retryWrites=true&w=majority&appName=FinaceSuite");

// Prompt a message in the terminal once the connection is "open"
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


// [SECTION] Backend Routes

// http://localhost:4000/users
// Defines the "/users" string to be included for all user routes defined in the "user" router file.
// Groups all routes in userRoutes under "/users"
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/incomes", incomeRoute);
app.use("/sources", sourceRoute);
app.use("/sourceTypes", sourceTypeRoute);
app.use("/data", dataRoute);




// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(port, () => console.log(`API is now online on port ${port}`))
}

module.exports = { app, mongoose };

// Nice code