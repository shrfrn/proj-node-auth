const BASE_URL = '/api/car/'
const CAR_KEY = 'carDB'

// _createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}

function get(carId) {
    return axios.get(BASE_URL + carId).then(res => res.data)
}

function remove(carId) {
    return axios.delete(BASE_URL + carId).then(res => res.data)
}

function save(car) {
    const method = car._id ? 'put' : 'post'
    const params = car._id ? `${car._id}` : ''

    return axios[method](BASE_URL + params, car).then(res => res.data)
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
    }
}