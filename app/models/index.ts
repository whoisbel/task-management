import '../configs/db.config'
import mongoose from 'mongoose'
import { url } from '../configs/db.config'
import { User } from './user.model'
import { Project } from './project.model'
mongoose.Promise = global.Promise

const db = {
    mongoose: mongoose,
    url: url,
    user: User,
    project: Project
}

export { db }