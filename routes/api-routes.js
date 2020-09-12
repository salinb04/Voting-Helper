// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

const newsAPI = require("../utils/newsAPI");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    if (req.user) {
      res.redirect("/categories");

      // if(req.user.firstLogin) {
      //   res.redirect("/categories");
      // } else {
      //   res.redirect("/members")
      // }
    }
    res.redirect("/login");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // Update categories

  // POST {categories: ["sports", "tech"]}

  // Set categories
  app.post("/api/categories", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      console.log(req.body.categories);
      // DB Format for Category
      const categories = req.body.categories.map((category) => ({
        user_id: req.user.id,
        category,
      }));

      db.Category.bulkCreate(categories)
        .then(() => res.redirect("/success"))
        .catch((err) => {
          res.redirect("/categories");
          console.log(err);
        });
    }
  });

  // get categories
  app.get("/api/categories", (req, res) => {
    if (!req.user) {
      res.json({});
    }

    db.Category.findAll({ where: { user_id: req.user.id } }).then((result) =>
      res.json(result)
    );
  });

  app.get("/api/news", (req, res) => {
    if (!req.user) {
      res.json({});
    }

    db.Category.findAll({ where: { user_id: req.user.id } }).then(
      async (result) => {
        const categories = result.map((obj) => obj.category);
        const userNews = await newsAPI.getNews(categories);
        res.json(userNews);
      }
    );
  });

  app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });
};
