import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

import userSvg from "../styles/svg/user.svg";

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
}

function getUsers() {
    //return httpService.get(`user`) ******* When backend is up uncomment
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

async function getById(userId) {
    //  const user = await httpService.get(`user/${userId}`) ******* When backend is up uncomment
    // gWatchedUser = user;  ******* When backend is up uncomment
    // return user;  ******* When backend is up uncomment
    gWatchedUser = userId;
    return userId;
}
function remove(userId) {
    // return httpService.delete(`user/${userId}`) ******* When backend is up uncomment
    return userId
}

async function update(user) {
    // user = await httpService.put(`user/${user._id}`, user)******* When backend is up uncomment
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

function login(userCred) {
    const users = getUsers();
    return new Promise((resolve, reject) => {
        const currUser = users.find(user => user.email === userCred.email)
        if (!currUser) reject({ reason: 'User doesn\'t exists', unsolved: 'email' });
        else if (currUser.password !== userCred.password) {
            if (!userCred.isSocial) reject({ reason: 'Incorrect user password', unsolved: 'password' });
        }
        if (currUser) {
            _saveLocalUser(currUser);
            resolve(currUser);
        }
        else reject({ reason: 'User doesn\'t exists', unsolved: 'email' });
    })

}
function signup(userCred) {
    const users = getUsers()
    return new Promise((resolve, reject) => {
        let currUser = users.find(user => user.email === userCred?.email)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (currUser === -1) currUser = null;
        else if (currUser) {
            reject({ reason: 'Email already exists', unsolved: 'email' });
            console.log(currUser);
        }
        else if (!emailRegex.test(userCred?.email)) reject({ reason: 'Invalid email pattern : ' + userCred.email, unsolved: 'email' });
        else if (!userCred.isSocial && userCred.password?.length < 5) reject({ reason: 'password should have at list 6 digits / letters', unsolved: 'password' });
        else if (!userCred.imgUrl) userCred.imgUrl = userSvg;
        userCred.likedStays = [];
        _saveLocalUser(userCred);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, userCred]));
        resolve(userCred);
        // const user = await httpService.post('auth/signup', userCred) ******* When backend is up uncomment
        // socketService.emit('set-user-socket', user._id);
        // return _saveLocalUser(user)******* When backend is up uncomment
    })
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')******* When backend is up uncomment
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}




// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched user (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        if (gWatchedUser.score !== watchedUser.score) {
            console.log('Watched user score changed - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        }
        gWatchedUser = watchedUser
    })
})();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();



addDemoData()
function addDemoData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
        {
            _id: 124,
            email: "koren",
            fullName: "koren aharon",
            password: "123",
            imgUrl: 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg',
            likedStays: [
                {
                    "_id": "mongo001",
                    "name": "House Of Uncle My"
                }
            ]

        },
        {
            _id: 125,
            email: "michael",
            fullName: "michael aharoni",
            password: "123",
            imgUrl: 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg',
            likedStays: [
                {
                    "_id": "mongo001",
                    "name": "Jaklino Riso"
                }
            ]
        },
        {
            _id: 126,
            email: "idan",
            fullName: "idan gez",
            password: "123",
            imgUrl: 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg',
            likedStays: [
                {
                    "_id": "mongo001",
                    "name": "Jaklino Riso"
                }
            ]
        },
        {
            _id: 127,
            email: "tal",
            fullName: "tal ekroni",
            password: "123",
            imgUrl: 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642926094/T02BJ4W8H45-U02KBCD8V4N-f8aebf3e2faa-512_douxlg.png',
            likedStays: [
                {
                    "_id": "mongo001",
                    "name": "Jaklino Riso"
                }
            ]
        }
    ]))




}

