class UserDTO {
    constructor(user){
        this._id = user._id
        this.name = user.name
        this.email = user.email
        this.phone = user.phone
        this.age = user.age
        this.cart = user.cart
        this.role = user.role
        this.dto = "DTO"
    }
}

module.exports = UserDTO