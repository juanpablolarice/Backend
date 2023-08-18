const User = require("../dao/models/user");

const authMiddleware = async (req, res, next) => {
    if(req.session.user.role){        
        if(req.session.user.role == 'User' || req.session.user.role == 'Admin'){            
            next()
        }else{
            console.log('No coincide la sesion')
            return res.redirect('login')
        }
    }else{
        return res.redirect('login')
    }
}


module.exports = { authMiddleware }