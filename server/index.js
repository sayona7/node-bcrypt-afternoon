require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      massive = require("massive"),
      authCtrl = require("./controllers/authController");

      const app = express();

      app.use(express.json());

      const PORT = 4000;

      let {CONNECTION_STRING, SESSION_SECRET} = process.env;

      massive({
          connectionString: CONNECTION_STRING,
          ssl: {
              rejectUnauthorized: false,
          },
      }).then((db) => {
          app.set("db", db)
          console.log("db connected")
      })

      app.use(
          session({
              secret: SESSION_SECRET,
              resave: true,
              saveUninitialized: false,
            //   cookie:{ maxAge: 1000 * 60 * 60 * 24 },
          })
      );

      // endpoints
      app.post("/auth/register", authCtrl.register);

      app.listen(PORT, () => {
          console.log(`Server listening on port: ${PORT}`)
      })