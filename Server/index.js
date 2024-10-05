import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/Route.js";

// import connection file 
import connect from "./database/Connection.js";

const app = express();

// app middlewares 
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
dotenv.config();

// appliation port 
const PORT = process.env.PORT || 8080;

// routes 
app.use("/api", router); // apis 

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

// start server only when we have valid connection 
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
