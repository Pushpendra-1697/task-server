const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const mongoose = require("mongoose");
const connect = require("./Configs/Config");
const UserRoutes = require("./Routes/user.route");
const LoginRoute = require("./Routes/login.route");
const SignupRotue = require("./Routes/signup.route");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false);
const cors = require("cors");
const { urlencoded } = require("express");
app.use(urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("yahoo!!!");
});

app.use("/signup", SignupRotue);
app.use("/login", LoginRoute);
app.use("/user", UserRoutes);


httpServer.listen(PORT, async () => {
  try {
    await connect();
    console.log("connected to DB");
  } catch (e) {
    console.log({ message: e.message });
  }
  console.log(`Server is running at port ${PORT}`);
});