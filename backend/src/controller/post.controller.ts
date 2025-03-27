import { Request, Response } from "express"
import postModel from "../models/post.model"

interface Post {
    id: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date
}

const getPosts = async (req: Request, res: Response) => {
    console.log(req.session)
    const posts = await postModel.getPosts()
    if (posts.length === 0) {
        res.status(204).send('No posts found')
        return
    }
    res.status(200).json(posts)
}

const createPost = async (req: Request<{title: string, body: string}>, res: Response) => {
    const { title, body } = req.body
    if (!title || !body) {
        res.status(500).send('Title or body is missing')
        return
    }

    const newPost = await postModel.createPost({title, body})

    console.log(`Post: ${newPost.title} is added`)
    res.status(201).json(newPost)
}

const deletePost = async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).send('Id is missing')
        return 
    }

    const deleted = await postModel.deletePost(id)
    
    if (!deleted) {
        res.status(404).send('Post not found')
        return
    }

    res.status(200).send('Post deleted successfully')
}

export default { getPosts, createPost, deletePost}