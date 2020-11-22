const sanitize = require("mongo-sanitize");
const bcrypt = require("bcryptjs");

const Post = require("./models/Post");
const User = require("./models/User");
const getMetaProperties = require("./scraper");

exports.init = app => {
  app.get("/users", async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
  });

  app.patch("/users/:id", async (req, res) => {
    const userEmail = sanitize(req.params.id);
    const url = sanitize(req.body.url);

    try {
      const user = await User.findOne({ _id: { $in: [userEmail] } });

      if (url != null) {
        const post = { url, ...(await getMetaProperties(url)) };
        const findedUrl = user.favorites.find(post => post.url === url);

        if (findedUrl) {
          return res.status(405).send({
            text: "Post already exists"
          });
        } else {
          user.favorites.push(post);
        }
      }

      try {
        const updatedUser = await user.save();
        return res.status(201).send({
          text: "Post added to your favorites",
          user: updatedUser
        });
      } catch (error) {
        return res.status(500).send({ error });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      await User.deleteOne({ _id: userId });
      return res.status(200).redirect("/users");
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    return res.status(200).send(posts);
  });

  app.get("/posts/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: { $in: [postId] } });
    return res.status(200).send(`Only One post : ${post}`);
  });

  app.post("/posts", async (req, res) => {
    const url = sanitize(req.body.url);

    if (!url) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      const findPost = await Post.findOne({ url: { $in: [url] } });
      if (findPost) {
        return res.status(405).send({
          text: "Post already exist"
        });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }

    const post = { url, ...(await getMetaProperties(url)) };

    try {
      const postData = new Post(post);
      const postSaved = await postData.save();

      return res.status(201).send({
        text: "Succes, new post created"
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.delete("/posts/:id", async (req, res) => {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      await Post.deleteOne({ _id: postId });
      return res.status(200).redirect("/posts");
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.post("/signup", async (req, res) => {
    const username = sanitize(req.body.username);
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!username || !email || !password) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      const findUser = await User.findOne({ email: { $in: [email] } });
      if (findUser) {
        return res.status(405).send({
          text: "User already exists"
        });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }

    // Sauvegarde de l'utilisateur en base et hashage du mot de passe
    try {
      const user = new User({
        username,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async function(err, hashedPassword) {
          if (err) {
            console.error(err);
          }
          user.password = hashedPassword;
          const userSaved = await user.save();

          return res.status(201).send({
            text: "New user saved",
            user: userSaved
          });
        });
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.post("/login", async (req, res) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!email || !password) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      const findUser = await User.findOne({ email: { $in: [email] } });
      const userPassw = findUser.password;

      findUser.authenticate(password, userPassw, (err, samePassword) => {
        if (!samePassword) {
          return res.status(401).send({
            text: "Wrong password"
          });
        }

        if (samePassword) {
          return res.status(200).send({
            user: findUser,
            text: "Authentication successful"
          });
        }
      });
    } catch (error) {
      return res.status(404).send({
        text: "User does not exist"
      });
    }
  });
};
