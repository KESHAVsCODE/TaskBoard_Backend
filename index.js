const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) return console.log(`Server Fails ${error.message}`);
  console.log(`Server listening on port ${PORT}`);
});
