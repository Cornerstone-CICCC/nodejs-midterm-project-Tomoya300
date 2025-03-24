import { Request, Response } from "express"
import userModel from "../models/user.model"

type User = {
    id: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string
}

const getUserByUsername = (req: Request<{ username: string}>, res: Response) => {
    const username = req.session?.username
    if (!username) {
        res.status(401).send('User not authenticated')
        return
    }
    const user = userModel.findByUsername(username)
    if (!user) {
        res.status(404).send('User not found')
        console.log('no users found')
        return
    }
    console.log(`${username} is found`)
    res.status(200).json(user)
}

const loginUser = async (req: Request<{},{}, Omit<User, 'id'>>, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(500).send('Username or Password is missing')
        return
    }
    const thisUser = await userModel.login(username, password)
    if (!thisUser) {
        res.status(500).send('Username or Password is invalid')
        return 
    }

    console.log('Session data:', req.session);


    if (req.session) {
        console.log('Session data two:', req.session);

        req.session.isLoggedIn = true
        req.session.username = thisUser.username
    }

    console.log(`${thisUser.username} logged in`)
    res.status(200).json(thisUser)
}

const addUser = async (req: Request<{username: string, password: string}>, res: Response) => {
    const { username, password, firstname, lastname } = req.body
    if (!username || !password || !firstname || !lastname) {
        res.status(500).send('One or more information is missing')
        return
    }

    const newUser = await userModel.create({username, password, firstname, lastname})
    if (!newUser) {
        res.status(409).json({ error: 'Username is already used'})
        return
    }
    console.log(`${newUser.username} added`)
    res.status(201).json(newUser)

}

const logout = (req: Request, res: Response) => {
    req.session = null
    console.log(`user logged out`)
    res.status(302).redirect('/login')
}

const checkUsers = async (req: Request, res: Response) => {
    const currUsers = await userModel.checkUsers
    console.log(`user list accessed`)
    res.status(200).json(currUsers)
}

export default {
    getUserByUsername,
    loginUser,
    addUser,
    logout,
    checkUsers
}