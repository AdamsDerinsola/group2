
let bcrypt = require('bcryptjs')
let User = require ('../model/user');

// INDEX OR LANDING PAGE
const page_index = (req, res) => {
    res.render('' )
}

// LOGIN PAGE
const page_login = (req, res) => {
    res.render('login')
}

// UPLOAD LOGIN FORM
const login_post = (res, req) => {
    // const errMessages = []
    console.log(req.body)
}

// SIGNUP PAGE
const signup_page = (req, res) => {
    res.render('signup', { errors: null })
}

// UPLOAD SIGNUP FORM
const signup_post = async (req, res) => {
    // Validations
    const errMessages = []
    if(!(req.body.username)){
        errMessages.push("Username required")
    }
    if(!(req.body.email)){
        errMessages.push("E-mail required")
    }
    if(!(req.body.password)){
        errMessages.push("Password required")
    }
    if (req.body.password != req.body.confirm_password){
        errMessages.push("Passwords do not match")
    }
    if(errMessages.length > 0){
       return(res.render('signup', { errors: errMessages }))
    } else {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = new User(req.body)
        // console.log(req.body)
        
        user.save()
        .then((result) => {
            req.session.user_id = user._id,
            res.redirect('/user/register')
        })
        
        .catch((err) => {
            console.log(err)
        }) 
    }
}

// PROFILE
const profile_page = (req, res) => {
     res.render('profile')
}

// CONGRATULATIONS
const congrats = (req, res) => {
     
}

module.exports = {
    page_index,
    page_login,
    login_post,
    signup_page,
    signup_post,
    profile_page,
    congrats
};