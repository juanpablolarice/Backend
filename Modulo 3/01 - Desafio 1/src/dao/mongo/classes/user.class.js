const userDTO = require('../../dto/user.dto')

class User {    
    GetUser = async (user) {
        const userDto = new userDTO(user)
        const result = await userModel.find({ _id: userDto.id})
        return result
    }
}

module.exports = User