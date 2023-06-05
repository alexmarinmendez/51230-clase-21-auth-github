import mongoose from "mongoose"

const UserModel = mongoose.model('users', mongoose.Schema({
    email: String,
    first_name: String
}))

export default UserModel