import { userService } from './user.service.local.js'

export const authService = {
    login,
    signup,
    logout,
    getLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

function login({ username, password }) {
    return userService.getByName(username)
        .then(user => {
            if (user && user.password === password) return _setLoggedinUser(user)
            return Promise.reject('Invalid login')
        })
}

// function login({ username, password }) {
//     return userService.getByCredentials(username, password)
//         .then(user => {
//             if (user) return _setLoggedinUser(user)
//             return Promise.reject('Invalid login')
//         })
// }

function signup(user) {
    return userService.add(user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSave = { 
        _id: user._id, 
        fullname: user.fullname, 
        isAdmin: user.isAdmin 
    }
    
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}