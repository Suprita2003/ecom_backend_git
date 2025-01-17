const express= require("express");
const mongoose= require("mongoose");
const dotenv= require("dotenv");
dotenv.config();
const userRoutes= require("./routes/userRoutes");
const productRoutes= require("./routes/productRoutes");
const cartRoutes= require("./routes/cartRoutes");
const orderRoutes= require("./routes/orderRoutes");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);


//products
app.use("/product", productRoutes);
app.use("/product",cartRoutes);
app.use("/product",orderRoutes);

// Define a default root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
  });
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log("Database connected successfully");
      app.listen(PORT, () => {  
          console.log(`Server is running on port ${PORT}`);
      });
  })
  .catch((error) => {
      console.error("Database connection error:", error);
  });

 



