import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const ORDERS_KEY = 'orders-db';

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    // addStayMsg,
}

window.orderService = orderService

async function query(hostId) {
    var orders = await storageService.query(ORDERS_KEY)
    let filteredOrders = orders.filter(order => order.hostId === hostId)
    return filteredOrders
}

async function getById(orderId) {
    return await storageService.get(ORDERS_KEY, orderId);

}

async function remove(orderId) {
    return await storageService.remove(ORDERS_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(ORDERS_KEY, order)
    } else {
        // Later, owner is set by the backend
        order.owner = userService.getLoggedinUser()
        savedOrder = await storageService.post(ORDERS_KEY, order)
    }
    return savedOrder
}
async function getEmptyOrder() {
    return order = {
        hostId: this.orderStay.host._id,
        stay_Id: this.orderStay._id,
        createdAt: Date.now(),
        price: totalPrice,
        startDate: start,
        endDate: end,
        status: 'pending'
    }

}
// const orders = [
//     {
//       "_id": "o1225",
//       "host":{
//         "id": "u102",
//         "imgUrl":'some img',
//         "fullname":'puki muki'
//       },
//       "createdAt": 9898989,
//       "buyer": {
//         "_id": "u101",
//         "fullname": "User 1"
//       },
//       "totalPrice": 160,
//       "startDate": "2025/10/15",
//       "endDate": "2025/10/17",
//       "guests": {
//         "adults": 2,
//         "kids": 1
//       },
//       "stay": {
//         "_id": "h102",
//         "name": "House Of Uncle My",
//         "price": 80.00
//       },
//       "msgs": [],
//       "status": "pending" // pending, approved
//     }
//   ]

// async function addStayMsg(stayId, txt) {
//     // Later, this is all done by the backend
//     const stay = await getById(stayId)
//     if (!stay.msgs) stay.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     stay.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, stay)

//     return msg
// }

