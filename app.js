const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid input");
    }

    const numbers = data.filter((item) => !isNaN(item)).map(String);
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    const highest_alphabet =
      alphabets.length > 0
        ? [
            alphabets.sort((a, b) =>
              a.toUpperCase() > b.toUpperCase() ? -1 : 1
            )[0],
          ]
        : [];

    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});