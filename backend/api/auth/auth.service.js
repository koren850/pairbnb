const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(email, password, isSocial) {
    logger.debug(`auth.service - login with email: ${email}`)
    try {
        const user = await userService.getByEmail(email)
        if (!user) return new Error({ reason: 'User doesn\'t exists', unsolved: 'email' });
        if (!isSocial) {
            const match = await bcrypt.compare(password, user.password)
            if (!match) return new Error({ reason: 'Incorrect user password', unsolved: 'password' });
        }
        if (user) {
            delete user.password
            // user._id = user._id.toString() // need ?

            console.log(user);
            return (user);
        }
    } catch (err) {
        if (err) return err;
    }
}

async function signup(email, password, isSocial, imgUrl, fullName) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with email: ${email}, fullName: ${fullName}`)
    try {
        const user = await userService.getByEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (user === -1) return new Error({ reason: 'Email already exists', unsolved: 'email' });
        else if (!emailRegex.test(email)) return new Error({ reason: 'Invalid email pattern : ' + userCred.email, unsolved: 'email' });
        else if (!isSocial && password?.length < 5) return new Error({ reason: 'password should have at list 6 digits / letters', unsolved: 'password' });
        console.log('hello');
        likedStays = [];
        const hash = (isSocial) ? '(User from social have no password).' : await bcrypt.hash(password, saltRounds);
        return userService.add({ fullName, email, password: hash, imgUrl, likedStays, isSocial })
    } catch (err) {
        return err;
    }
}

module.exports = {
    signup,
    login
}