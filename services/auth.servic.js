import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.SECRET1 || 'secret-puk-1234')

export const userService = {
	getLoginToken,
	validateToken,
}

function getLoginToken(user) {
	const str = JSON.stringify(user)
	const encryptedStr = cryptr.encrypt(str)
	return encryptedStr
}

function validateToken(token) {
	if (!token) return null
    
	const str = cryptr.decrypt(token)
	const user = JSON.parse(str)
	return user
}