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

async function query() {
 return await storageService.query(ORDERS_KEY)
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
async function getEmptyOrder(){
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

