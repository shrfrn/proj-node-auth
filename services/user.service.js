import fs from 'fs'
import { utilService } from './util.service.js'

const users = utilService.readJsonFile('data/user.json')

export const userService = {
	query,
	getById,
	getByName,
	remove,
	save,
}

function query() {
	const usersToReturn = users.map(user => ({ _id: user._id, fullname: user.fullname }))
	return Promise.resolve(usersToReturn)
}

function getById(userId) {
	var user = users.find(user => user._id === userId)
	if (!user) return Promise.reject('User not found!')

    delete user.password
	return Promise.resolve(user)
}

function getByName(username) {
    // You might want to remove the password validation for dev
	var user = users.find(user => user.username === username)
	return Promise.resolve(user)
}

function remove(userId) {
	users = users.filter(user => user._id !== userId)
	return _saveUsersToFile()
}

function save(user) {
    // Check if username exists...
	user._id = utilService.makeId()
	users.push(user)

	return _saveUsersToFile()
        .then(() => {
            delete user.password
            return user
        })
}

function _saveUsersToFile() {
	return new Promise((resolve, reject) => {
		const usersStr = JSON.stringify(users, null, 2)
		fs.writeFile('data/user.json', usersStr, err => {
			if (err) {
				return console.log(err)
			}
			resolve()
		})
	})
}