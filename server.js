/********************************************************************************
 * WEB322 – Assignment 02
 * 
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * 
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 * 
 * Name: Alexander Pham Student ID: 110470234 Date: Feb 19, 2024
 ********************************************************************************/

const express = require("express");
const legoData = require("./modules/legoSets");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Configure EJS as the view engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const initializeServer = async () => {
  try {
    await legoData.initialize();
    console.log(`Initialization successful.`);
    setupRoutes();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (err) {
    console.error(`Initialization failed: ${err}`);
  }
};

const setupRoutes = () => {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });
  

  app.get("/lego/sets", async (req, res) => {
    try {
      // Render sets.ejs view with the legoSets data stored in a "sets" variable
      const theme = req.query.theme;
      let sets;
      if (theme) {
        sets = await legoData.getSetsByTheme(theme);
      } else {
        sets = await legoData.getAllSets();
      }
      res.render("sets", { sets: sets });
    } catch (error) {
      res.status(404).render("404", { message: error });
    }
  });
  
    // Route for getting specific lego set by set number
    app.get("/lego/sets/:setNum", async (req, res) => {
      try {
        const set = await legoData.getSetByNum(req.params.setNum);
        if (set) {
          res.render("set", { set: set });
        } else {
          res.status(404).send("Set not found");
        }
      } catch (error) {
        res.status(404).render("404", { message: error });
      }
    });


  // Handle 404 errors
  app.use((req, res) => {
    res.status(404).render("404", { message: "Sorry, the page you are looking for cannot be found." });
  });
};

initializeServer();
