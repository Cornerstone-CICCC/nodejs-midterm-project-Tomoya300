import { Router } from 'express'
import postController from '../controller/post.controller'

const postRouter = Router()

postRouter.get('/posts', postController.getPosts)
postRouter.post('/create', postController.createPost)
postRouter.delete('/delete/:id', postController.deletePost)

export default postRouter