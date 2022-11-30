
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { store } from '../store/store.js';
import { createStore } from 'vuex';

const STORAGE_KEY = 'car'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg,
}
window.ss = stayService

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var cars = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     cars = cars.filter(car => car.price <= filterBy.price)
    // }
    // return cars

}
function getById(id) {
    // return storageService.get(STORAGE_KEY, carId)
    return httpService.get(`air-share/${id}`)
}

async function remove(id) {
    // await storageService.remove(STORAGE_KEY, carId)
    return httpService.delete(`air-share/${id}`)
}
async function save(entity) {
    var savedEntity
    if (entity._id) {
        // savedCar = await storageService.put(STORAGE_KEY, car)
        savedEntity = await httpService.put(`air-share/${entity._id}`, entity)

    } else {
        // Later, owner is set by the backend
        entity.owner = userService.getLoggedinUser();
        // savedCar = await storageService.post(STORAGE_KEY, car)
        savedEntity = await httpService.post('air-share', entity)
    }
    return savedEntity
}

async function addCarMsg(id, txt) {
    const savedMsg = await httpService.post(`air-share/${id}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





