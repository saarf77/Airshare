
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
;(async ()=>{
    await storageService.post(STORAGE_KEY,  {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "rooms":3,
        "beds":3,
        "type": "House",
        "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "amenities": [
          "TV",
          "Wifi",
          "Kitchen",
          "Smoking allowed",
          "Pets allowed",
          "Cooking basics"
        ],
        "labels": [
          "Top of the world",
          "Trending",
          "Play",
          "Tropical"
        ]
      })
    await storageService.post(STORAGE_KEY,  {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "rooms":2,
        "beds":2,
        "type": "Hotel",
        "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        "price": 150.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "amenities": [
          "TV",
          "Wifi",
          "Kitchen",
          "Smoking allowed",
          "Pets allowed",
          "Cooking basics"
        ],
        "labels": [
          "Top of the world",
          "Trending",
          "Play",
          "Tropical"
        ]
      })
    await storageService.post(STORAGE_KEY,  {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "rooms":1,
        "beds":1,
        "type": "Cabin",
        "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        "price": 250.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "amenities": [
          "TV",
          "Wifi",
          "Kitchen",
          "Smoking allowed",
          "Pets allowed",
          "Cooking basics"
        ],
        "labels": [
          "Top of the world",
          "Trending",
          "Play",
          "Tropical"
        ]
      })
})()