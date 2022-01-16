// e2e-run-tests.js
const cypress = require("cypress");

cypress
  .run({
    // the path is relative to the current working directory
    spec: "./cypress/integration/covidbot-tohmajarvi.spec.js",
  })
  .then((results) => {
    if (results.totalPassed == 1) {
      console.log("tohmajarvi success");
    } else {
      console.log("tohmajarvi failed");
    }
  })
  .catch((err) => {
    console.error(err);
  });

cypress
  .run({
    // the path is relative to the current working directory
    spec: "./cypress/integration/covidbot-joensuu.spec.js",
  })
  .then((results) => {
    if (results.totalPassed == 1) {
      console.log("joensuu success");
    } else {
      console.log("joensuu failed");
    }
  })
  .catch((err) => {
    console.error(err);
  });
