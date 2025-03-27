import { v4 as uuidv4 } from 'uuid'

interface Post {
    id: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date
}

class PostModel {
    posts: Post[] = []

    getPosts () {
        return this.posts
    }

    async createPost (newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
        const postId = uuidv4()
        const post: Post = {
            id: postId,
            title: newPost.title,
            body:  newPost.body,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.posts.push(post)

        return post
    }

    async deletePost (id: string) {
        const postIndex = this.posts.findIndex(post => post.id === id)
        if (postIndex === -1) {
            return false
        }
        this.posts.splice(postIndex, 1)
        return true
    }
}

export default new PostModel()