const dotenv = require('dotenv');

dotenv.config();

const app = require('./app.js');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const db = require('./models');

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
