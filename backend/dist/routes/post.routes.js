"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controller/post.controller"));
const postRouter = (0, express_1.Router)();
postRouter.get('/posts', post_controller_1.default.getPosts);
postRouter.post('/create', post_controller_1.default.createPost);
postRouter.delete('/delete/:id', post_controller_1.default.deletePost);
exports.default = postRouter;
