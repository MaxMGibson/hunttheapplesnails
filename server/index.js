const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World! (from Node/Express)");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World! (from API)"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});