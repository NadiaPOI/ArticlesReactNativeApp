const mongoose = require("mongoose");

const app = require("./app");

// Multiples connections
const dbConnect = mongoose
  .set("useCreateIndex", true)
  .connect("mongodb://localhost:27017/default", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

dbConnect
  .then(() => {
    const port = 8800;

    app.listen(port, err => {
      if (err) {
        console.error(err);
      }
      console.log("Express server listening on port 8800.");
    });
  })
  .catch(err => {
    console.error("Error DB connecting", { err });
  });
