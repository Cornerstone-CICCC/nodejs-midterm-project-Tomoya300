import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

type User = {
    id: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string
}

class UserModel {
    users: User[] = []
    
    findByUsername(username: string) {
        const user = this.users.find(u => u.username === username)
        if (!user) {
            return null
        }
        return user
    }

    async create(newUser: Omit<User, 'id'>) {
        const { username, password, firstname, lastname } = newUser
        const foundIndex = this.users.findIndex(u => u.username === username)
        if (foundIndex !== -1) {
            return false
        }
        const hashedPass = await bcrypt.hash(password, 12)
        const user: User = {
            id: uuidv4(),
            username,
            password: hashedPass,
            firstname,
            lastname
        }
        this.users.push(user)
        console.log(this.users)
        return user
    }

    async login(username: string, password: string) {
        const user = this.users.find(u => u.username === username)
        if (!user) {
            return false
        }

        const isPassOk = await bcrypt.compare(password, user.password)

        if (!isPassOk) {
            return false
        }

        return user
    }

    checkUsers() {
        return this.users
    }
}

export default new UserModel