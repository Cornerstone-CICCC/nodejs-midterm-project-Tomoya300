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
const post_model_1 = __importDefault(require("../models/post.model"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session);
    const posts = yield post_model_1.default.getPosts();
    if (posts.length === 0) {
        res.status(204).send('No posts found');
        return;
    }
    res.status(200).json(posts);
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(500).send('Title or body is missing');
        return;
    }
    const newPost = yield post_model_1.default.createPost({ title, body });
    console.log(`Post: ${newPost.title} is added`);
    res.status(201).json(newPost);
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send('Id is missing');
        return;
    }
    const deleted = yield post_model_1.default.deletePost(id);
    if (!deleted) {
        res.status(404).send('Post not found');
        return;
    }
    res.status(200).send('Post deleted successfully');
});
exports.default = { getPosts, createPost, deletePost };
