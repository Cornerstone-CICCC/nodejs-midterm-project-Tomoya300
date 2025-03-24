"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET_KEY));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
const SIGN_KEY = process.env.SIGN_KEY;
const ENCRYPT_KEY = process.env.ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Error: cookie not found');
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use('/user', user_routes_1.default);
app.get('/', (req, res) => {
    console.log('someone visiting the server');
    res.status(200).send('Welcome to my server!');
});
app.get('/getCookie', (req, res) => {
    res.cookie('username', 'JohnDoe', { maxAge: 90000 });
    res.status(200).send('cookie found!');
});
app.use((req, res) => {
    res.status(404).send('page not found');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
