"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getUserByUsername = (req, res) => {
    var _a;
    const username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        res.status(401).send('User not authenticated');
        return;
    }
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).send('User not found');
        console.log('no users found');
        return;
    }
    console.log(`${username} is found`);
    res.status(200).json(user);
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).send('Username or Password is missing');
        return;
    }
    const thisUser = yield user_model_1.default.login(username, password);
    if (!thisUser) {
        res.status(500).send('Username or Password is invalid');
        return;
    }
    console.log('Session data:', req.session);
    if (req.session) {
        req.session.isLoggedIn = false;
        req.session.username = '';
        req.session.userId = '';
    }
    if (req.session) {
        console.log('Session data two:', req.session);
        req.session.isLoggedIn = true;
        req.session.username = thisUser.username;
        req.session.userId = thisUser.id;
    }
    console.log(`${thisUser.username} logged in`);
    res.status(200).json(thisUser);
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).send('One or more information is missing');
        return;
    }
    if (req.session) {
        req.session = null;
    }
    const newUser = yield user_model_1.default.create({ username, password, firstname, lastname });
    if (!newUser) {
        res.status(409).json({ error: 'Username is already used' });
        return;
    }
    console.log(`${newUser.username} added`);
    res.status(201).json(newUser);
});
const logout = (req, res) => {
    req.session = null;
    console.log(`user logged out`);
    res.status(302).redirect('/login');
};
const checkUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currUsers = yield user_model_1.default.checkUsers;
    console.log(`user list accessed`);
    res.status(200).json(currUsers);
});
exports.default = {
    getUserByUsername,
    loginUser,
    addUser,
    logout,
    checkUsers
};
