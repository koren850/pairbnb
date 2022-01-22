import { lastDayOfDecade } from 'date-fns'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
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
    remove,
    update,
    changeScore
}

// To help debugging from console
window.userService = userService


function getUsers() {
    // return storageService.query('user')
    //return httpService.get(`user`) ******* When backend is up uncomment
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    //  const user = await httpService.get(`user/${userId}`) ******* When backend is up uncomment
    // gWatchedUser = user;  ******* When backend is up uncomment
    // return user;  ******* When backend is up uncomment
    gWatchedUser = userId;
    return userId;
}
function remove(userId) {
    // return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`) ******* When backend is up uncomment
    return userId
}

async function update(user) {
    // await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)******* When backend is up uncomment
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const users = getUsers()
    console.log(userCred)
    const currUser = users.find(user => user.password === userCred.password && user.email === userCred.email)
    if (!currUser) return console.log('no such user')
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred) ******* When backend is up uncomment
    // socketService.emit('set-user-socket', user._id);
    //if (user) return _saveLocalUser(user) ******* When backend is up uncomment

    if (currUser) return _saveLocalUser(currUser)
}
async function signup(userCred) {
    const users = getUsers()
    localStorage.setItem(STORAGE_KEY, [...users, { email: userCred.email, password: userCred.password }])
    // userCred.score = 10000;
    // const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred) ******* When backend is up uncomment
    // socketService.emit('set-user-socket', user._id);
    // return _saveLocalUser(user)******* When backend is up uncomment
    return _saveLocalUser(userCred)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    // return await httpService.post('auth/logout')******* When backend is up uncomment
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}


// (async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })();



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
            _id: 123,
            email: "test",
            password: "test",
        },
        {
            _id: 124,
            email: "koren",
            password: "123",
        },
        {
            _id: 125,
            email: "michael",
            password: "123",
        },
        {
            _id: 126,
            email: "idan",
            password: "123",
        }
    ]))




}

