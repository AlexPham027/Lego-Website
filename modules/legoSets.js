const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

const initialize = () => {
  return new Promise((resolve, reject) => {
    try {
      setData.forEach((set) => {
        const matchingTheme = themeData.find((theme) => theme.id.toString() === set.theme_id.toString());
        if (matchingTheme) {
          sets.push({
            ...set,
            theme: matchingTheme.name, 
          });
        }
      });
      resolve();
    } catch (error) {
      reject("Error with initialize()"); 
    }
  });
};

const getAllSets = () => {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) {
      resolve(sets);
    } else {
      reject("Error with getAllSets()");
    }
  });
};

const getSetByNum = (setNum) => {
  return new Promise((resolve, reject) => {
    const matchedSet = sets.find((set) => set.set_num === setNum);
    if (matchedSet) {
      resolve(matchedSet);
    } else {
      reject("Unable to find requested set");
    }
  });
};

const getSetsByTheme = (theme) => {
  return new Promise((resolve, reject) => {
    const matchedSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(theme.toLowerCase())
    );
    if (matchedSets.length > 0) {
      resolve(matchedSets);
    } else {
      reject("Unable to find requested sets");
    }
  });
};

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
