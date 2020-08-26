import { User } from 'models/user/model'

export type Message = {
    id: number,
    user: User,
    text: string,
}