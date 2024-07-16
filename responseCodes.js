const ERROR_CODE = {
    token_invalid:{
        status:false,
        message:'Token is not valid. Kindly login again'
    },
    token_absent:{
        status:false,
        message:'Token not present in request. User is not logged in'
    },
    api_login_fail:{
        status:false,
        message:'Unable to login to API backend'
    },
    user_invalid:{
        status:false,
        message:'User not found'
    },
    email_mismatch:{
        status:false,
        message:"Email does not belong to the currently logged in user. Email cannot be changed."
    },
    password_error:{
        status:false,
        message:'Invalid Password'
    }
}

const RESPONSE_CODES = {

}


module.exports = {ERROR_CODE, RESPONSE_CODES};