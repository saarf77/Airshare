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
function getEmptyOrder() {
    return {
        createdAt: 0,
        totalPrice: 0,
        startDate:0,
        endDate: 0,
        status:'empty', // empty, pending, approved
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pests: 0
        },
        stay:{
            _id: '0',
            name: '',
       },
        host:{
            id: '',
            imgUrl:'',
            fullname: '',
        },
        buyer: {
            _id: '',
            fullname:'',
            imgUrl:'',
       },
        msgs: [],
      }
}

const orders = [
     {
       "_id": "28bcA9JkHg7wtUIK1",
       "createdAt": 1670347478690,
       "totalPrice": 1464.43,
       "startDate": 1766527200000,
       "endDate": 1772316000000,
       "guests": {
        "adults": 2,
        "children": 1,
        "infants": 0,
        "pests": 0
       },
       "status": "approved", // empty, pending, approved
       "stay": {
        "_id": "622f337a75c7d36e498aaafb",
        "name": "Fresh and modern 1BR in Bed-Stuy",
      },
       "host":{
         "id": "622f3407e36c59e6164fbe7e",
         "imgUrl":"https://a0.muscache.com/im/users/28702061/profile_pic/1437949646/original.jpg?aki_policy=profile_small",
         "fullname":'Tyler',
       },
        "buyer": {
        "_id": "7N4OEdLC2BfjT",
        "fullname": "Heavy Metal",
         "imgUrl":"https://res.cloudinary.com/dj88xudav/image/upload/v1670099516/user-11_zytml0.png",
      },
       "msgs": [],
     },
     {
        "_id": "47Owd6RrQUzcPX7R",
        "createdAt": 1670347478690,
        "totalPrice": 7843.52,
        "startDate": 1802642400000,
        "endDate": 1803506400000,
        "guests": {
          "adults": 5,
          "children": 0,
          "infants": 0,
          "pests": 1,
        },
        "status": "pending", // empty, pending, approved
        "stay": {
         "_id": "622f337a75c7d36e498aab07",
         "name": "Newly and comfortable apt",
       },
        "host":{
            "_id": "dXhHaSyRjNz1p",
            "fullname": "Star Dreamer",
            "imgUrl":"https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-1_pwe071.png",
        },
         "buyer": {
            "_id": "Hl6Kk4Ce9yrMr",
            "fullname": "rouge474",
            "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670100293/user-16_twzwub.png",
       },
        "msgs": [],
      },
      {
        "_id": "47Owd6RrQUzcPX7R",
        "createdAt": 1670347478690,
        "totalPrice": 3545.41,
        "startDate": 1741298400000,
        "endDate": 1741644000000,
        "guests": {
          "adults": 3,
          "children": 3,
          "infants": 1,
          "pests": 5,
        },
        "status": "pending", // empty, pending, approved
        "stay": {
         "_id": "622f337a75c7d36e498aab07",
         "name": "+Spacious Studio&Kitchenette near Blue Mosque+",
       },
       "host":{
            "_id": "dXhHaSyRjNz1p",
            "fullname": "Star Dreamer",
            "imgUrl":"https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-1_pwe071.png",
        },
         "buyer": {
            "_id": "0ftUf74t6ZUzu",
            "name": "White Wires 49",
            "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-14_ow2as4.png",
       },
        "msgs": [],
      }
   ]

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
