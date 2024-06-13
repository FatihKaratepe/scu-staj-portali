const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const secretKey = require('./app/config/token');
const jwt = require('jsonwebtoken');


const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    const tokenNotRequired = req.headers['no-token-control'];
    if (!tokenNotRequired) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token bulunamadı' });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Token geçersiz' });
            else next()
        });
    } else {
        next()
    }
});

app.get('/', (req, res) => {
    res.status(200).send('ok');
})
require("./app/routes/auth.routes")(app);
require("./app/routes/ogrenci.routes")(app);
require("./app/routes/firma.routes")(app);
require("./app/routes/fakulte.routes")(app);
// require("./app/routes/staj.routes")(app);
// require("./app/routes/rapor.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
