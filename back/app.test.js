const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("./app");
const request = supertest(app);

beforeAll(async () => {
  await mongoose
    .set("useCreateIndex", true)
    .connect("mongodb://localhost:27017/defaultTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  const db = mongoose.connection;

  db.on("error", error => console.error(error));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
});

describe("GET/users", () => {
  it("Should return a response with succes", async () => {
    const response = await request.get("/users");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET/posts", () => {
  it("Should return a response with succes", async () => {
    const response = await request.get("/posts");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST/login", () => {
  it("Should return success response when an existing user logged", async () => {
    const response = await request.post("/login").send({
      email: "nadia@gmail.com",
      password: "nadines"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe("Authentication successful");
  });

  it("Should return error when empty data", async () => {
    const response = await request.post("/login").send({
      email: "",
      password: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.text).toBe("Bad request");
  });

  it("Should return error response when an non-existing user logged", async () => {
    const response = await request.post("/login").send({
      email: "xavier@gmail.com",
      password: "tdd"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.text).toBe("User does not exist");
  });

  it("Should return error response when an existing user logged with wrong password", async () => {
    const response = await request.post("/login").send({
      email: "nadia@gmail.com",
      password: "tgd"
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.text).toBe("Wrong password");
  });
});

describe("POST/signup", () => {
  it("Should respond with succes when a user signed up", async () => {
    // User déja existant car ajouté ds le test, il faut le supprimer au prealable
    const users = await request.get("/users");
    const user = users.body.filter(user => user.email === "marco@gmail.com");
    const userId = user[0]._id;
    console.log(userId);

    await request.delete(`/users/${userId}`).send();

    const response = await request.post("/signup").send({
      username: "Marco",
      email: "marco@gmail.com",
      password: "marco"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.text).toBe("New user saved");
  });

  it("Should return error when empty data", async () => {
    const response = await request.post("/signup").send({
      firstname: "",
      email: "",
      password: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.text).toBe("Bad request");
  });

  it("Should respond with error when a existing user signed up", async () => {
    const response = await request.post("/signup").send({
      username: "Nadia",
      email: "nadia@gmail.com",
      password: "nadines"
    });

    expect(response.statusCode).toBe(405);
    expect(response.body.text).toBe("User already exists");
  });
});

describe("DELETE/posts/:id", () => {
  it("Should respond with succes when a existing user is deleted and redirect", async () => {
    const postId = "5dee31155039f929c856e98c";
    const response = await request.delete(`/posts/${postId}`).send();

    expect(response.statusCode).toBe(302);
  });

  it("Should respond with error when error", async () => {
    const postId = "2";
    const response = await request.delete(`/posts/${postId}`).send();

    expect(response.statusCode).toBe(500);
  });
});

afterAll(done => {
  mongoose.disconnect(done);
});
