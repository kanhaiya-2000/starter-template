const User = require("../models/User")
const bcrypt = require("bcrypt");
const { AssignToken } = require("../middlewares");

function getHash(password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err != null) callback({ hash: null, err: true })
        else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err != null) callback({ hash: null, err: true })
                else {
                    callback({ hash: hash, err: false })
                }
            });
        }
    })
}

async function SignUp(data, callback) {
    const { email, name, password } = data;
    if (!name) {
        return callback("name field is missing", null)
    }
    const checkifUserExists = await User.findOne({ email: email.toLowerCase() })
    if (checkifUserExists) {
        callback("User already exists with this email", null)
    }
    else {
        getHash(password, async (data) => {
            const { hash } = data;

            if (hash) {
                const user = await User.create({
                    name,
                    password: hash,
                    email: email.toLowerCase()
                })
                AssignToken(user, (err, token) => {
                    if (err) callback("Something bad happened", null)
                    else {
                        const {name,_id,email} = user;
                        callback(null, {token:token,user:{name,_id,email}})
                    }
                })
            }
            else {
                callback("Password hash could not be generated", null)
            }
        })
    }
}

async function Login(data, callback) {
    const { email, password } = data;
    const checkifUserExists = await User.findOne({ email: email.toLowerCase() })
    if (!checkifUserExists) {
        callback("No user exists with this email", null)
    }
    else {
        bcrypt.compare(password, checkifUserExists.password, (err, valid) => {
            if (err) {
                console.log(err);
                callback(err, null)
            }
            else if (!valid) {
                console.log(valid);
                callback("Wrong password", null)
            }
            else {
                AssignToken(checkifUserExists, (err, token) => {
                    if (err) callback("Something bad happened", null)
                    else {
                        const {name,_id,email} = checkifUserExists;
                        callback(null, {token:token,user:{name,_id,email}})
                    }
                })
            }

        })
    }
}

module.exports = {
    SignUp,
    Login
}