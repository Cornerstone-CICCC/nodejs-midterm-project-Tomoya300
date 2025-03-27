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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class PostModel {
    constructor() {
        this.posts = [];
    }
    getPosts() {
        return this.posts;
    }
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = (0, uuid_1.v4)();
            const post = {
                id: postId,
                title: newPost.title,
                body: newPost.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.posts.push(post);
            return post;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postIndex = this.posts.findIndex(post => post.id === id);
            if (postIndex === -1) {
                return false;
            }
            this.posts.splice(postIndex, 1);
            return true;
        });
    }
}
exports.default = new PostModel();
