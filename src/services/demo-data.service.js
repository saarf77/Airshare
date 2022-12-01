import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STAYS_KEY = 'stays';
const USERS_KEY = 'users';




export const stayService = {
       query,
       getById,
       save,
       remove,
       getEmptyStay,
       addStayMsg
}
   
;(async () =>{
       const stays = await storageService.query(STAYS_KEY);
       if(!stays || stays.length === 0) storageService.save(STAYS_KEY, demoStays);
})();


async function query(filterBy) {
     console.log('FROM SERVICE',filterBy)
     const {range,rooms,beds,type,amenities} = filterBy
       var stays = await storageService.query(STAYS_KEY)
     
       if (range) {
         stays = stays.filter(stay => stay.price >= range[0] && stay.price <= range[1] )
       }
       if (rooms) {
         stays = stays.filter(stay => stay.rooms >= +rooms)
       }
       if(beds){
         stays = stays.filter(stay => stay.beds >= +beds)
       }
       if(type){
         stays = stays.filter(stay => stay.type === type)
       }
       if(amenities){
         stays = stays.filter(stay => {
           return amenities.every(amenity => stay.amenities.includes(amenity))
         })
       }
       return stays
   }
   
   function getById(stayId) {
       return storageService.get(STAYS_KEY, stayId);
   }
   
   async function remove(stayId) {
       await storageService.remove(STAYS_KEY, stayId)
   }
   
   async function save(stay) {
       var savedStay
       if (stay._id) {
           savedStay = await storageService.put(STAYS_KEY, stay)
       } else {
           // Later, owner is set by the backend
           stay.owner = userService.getLoggedinUser()
           savedStay = await storageService.post(STAYS_KEY, stay)
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
       await storageService.put(STAYS_KEY, stay)
   
       return msg
   }
   
   function getEmptyStay() {
       return {
           vendor: 'Susita-' + (Date.now() % 1000),
           price: utilService.getRandomIntInclusive(1000, 9000),
       }
   }

   


const demoStays = [
       {
              "_id": "10006546",
              "name": "Ribeira Charming Duplex",
              "rooms":1,
              "beds":3,
              "baths": 1,
              "type": "House",
              "imgUrls": [
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833194/example-1_s5aggn.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-2_rx38ti.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-3_gghx9n.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-4_yuivo1.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833229/example-5_hqsw5f.png",
                     ],
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
              ],
              "loc": {
              "country": "United States",
              "countryCode": "PT",
              "city": "Maui",
              "address": "17 Kombo st",
              "lat": -8.61308,
              "lng": 41.1413
              },
              "reviews": [
                     {
                            "user_id": "7162cXTf68l",
                            "starRate": 4.3,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7N4OEdLC2B",
                            "starRate": 4.1,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7hlo5eR0XL",
                            "starRate": 5.3,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "a4D677Jv8jI",
                            "starRate": 4.1,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "0ftUf74t6Zu",
                            "starRate": 5.0,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "mxhMA764AU2",
                            "starRate": 2.1,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "Hl6Kk4Ce9yrM",
                            "starRate": 4.9,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },
              ]
       }, {
              "_id": "10006546",
              "name": "Ribeira Charming Duplex",
              "rooms":2.5,
              "beds":5,
              "baths": 2,
              "type": "House",
              "imgUrls": [
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833194/example-1_s5aggn.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-2_rx38ti.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-3_gghx9n.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-4_yuivo1.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833229/example-5_hqsw5f.png",
                     ],
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
              ],
              "loc": {
              "country": "United States",
              "countryCode": "PT",
              "city": "Maui",
              "address": "17 Kombo st",
              "lat": -8.61308,
              "lng": 41.1413
              },
              "reviews": [
                     {
                            "user_id": "7162cXTf68l",
                            "starRate": 2.3,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7N4OEdLC2B",
                            "starRate": 2.4,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7hlo5eR0XL",
                            "starRate": 1.7,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "a4D677Jv8jI",
                            "starRate": 4.2,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "0ftUf74t6Zu",
                            "starRate": 1.5,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "mxhMA764AU2",
                            "starRate": 0.0,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "Hl6Kk4Ce9yrM",
                            "starRate": 2.7,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },
              ]
       }, {
              "_id": "10006546",
              "name": "Ribeira Charming Duplex",
              "rooms":7,
              "beds":16,
              "baths": 3,
              "type": "House",
              "imgUrls": [
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833194/example-1_s5aggn.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-2_rx38ti.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-3_gghx9n.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833230/example-4_yuivo1.png",
                     "https://res.cloudinary.com/dj88xudav/image/upload/v1669833229/example-5_hqsw5f.png",
                     ],
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
              ],
              "loc": {
              "country": "United States",
              "countryCode": "PT",
              "city": "Maui",
              "address": "17 Kombo st",
              "lat": -8.61308,
              "lng": 41.1413
              },
              "reviews": [
                     {
                            "user_id": "7162cXTf68l",
                            "starRate": 3.7,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7N4OEdLC2B",
                            "starRate": 3.6,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "7hlo5eR0XL",
                            "starRate": 4.4,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "a4D677Jv8jI",
                            "starRate": 4.1,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "0ftUf74t6Zu",
                            "starRate": 5.0,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "mxhMA764AU2",
                            "starRate": 2.1,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },{
                            "user_id": "Hl6Kk4Ce9yrM",
                            "starRate": 2.7,
                            "content": "that was awesome!!! the best night i had ever had in a place"
                     },
              ]
       }
]

