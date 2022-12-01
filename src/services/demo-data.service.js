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
       if(stays?.length === 0) storageService.save(STAYS_KEY, demoStays);

       const users = await storageService.query(USERS_KEY);
       if(users?.length === 0) storageService.save(USERS_KEY, demoUsers);
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
   
   async function getById(Id, typeName) {
       switch (typeName) {
              case 'stay':
                     return await storageService.get(STAYS_KEY, Id);
              case 'user':
                     const users = await storageService.query(USERS_KEY);
                     const stay = await storageService.get(STAYS_KEY, Id);
                     let currUser = users.filter((user)=>{
                            return user._id === stay.ownerId;
                     });
                     return currUser[0];
              default:
                     return await storageService.get(STAYS_KEY, Id);
       }
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

   
//TODO: separate the achievements to there own "table" (data collection)
// so inside the stay achievements list there will be only a number array (of the index of the table/collection row);
// demo data urls:
// 1 =>       http://localhost:5173/#/details/H9Tsb7gCOl7zi
// 2 =>       http://localhost:5173/#/details/lD6xkN4bdvNI9
// 3 =>       http://localhost:5173/#/details/lD6xkN4bdvNI9


const demoStays = [
       {
              "_id": "H9Tsb7gCOl7zi",
              "ownerId": "WbYTQf8YP2ezO",
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
              "achievements": [
                     {
                            "iconName": "workDesk",
                            "achievementName": "Dedicated workspace",
                            "achievementDescription": "A private room with wifi that's well-suited for working."
                     },
                     {
                            "iconName": "swimmingPool",
                            "achievementName": "Dive right in",
                            "achievementDescription": "This is one of the few places in the area with a pool."
                     },
                     {
                            "iconName": "freeCancellation",
                            "achievementName": "Free cancellation 3 days before.",
                            "achievementDescription": ""
                     },
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
              "_id": "wXAfnS2RxGqBb",
              "ownerId": "A26HW2jg7Qo",
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
              "achievements": [
                     {
                            "iconName": "supremeHost",
                            "achievementName": "is a supremehost",
                            "achievementDescription": "supremehost are experienced, highly rated hosts who are committed to providing great stays for guests.",
                            "hostName": "Master Black",
                     },
                     {
                            "iconName": "furryFriends",
                            "achievementName": "Furry friends welcome",
                            "achievementDescription": "Bring your pets along for the stay."
                     },
                     {
                            "iconName": "selfCheckIn",
                            "achievementName": "Self check-in",
                            "achievementDescription": "You can check in with the doorman."
                     },
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
              "_id": "lD6xkN4bdvNI9",
              "ownerId": "dXhHaSyRjNz1p",
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
              "achievements": [
                     {
                            "iconName": "freeParking",
                            "achievementName": "Park for free",
                            "achievementDescription": "This is one of the few places in the area with free parking."
                     },
                     {
                            "iconName": "greatLocation",
                            "achievementName": "Great location",
                            "achievementDescription": "100% of recent guests gave the location a 5-star rating."
                     },
                     {
                            "iconName": "experiencedHost",
                            "achievementName": "Experienced host",
                            "achievementDescription": "has more then 20 reviews for other places.",
                            "hostName": "Star Dreamer",
                     },
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

const demoUsers = [
       {
              "_id": "WbYTQf8YP2ezO",
              "name": "Mister red",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-3_gyhyze.png",
              "propertiesId": ["H9Tsb7gCOl7zi"]
       },
       {
              "_id": "A26HW2jg7Qo",
              "name": "Master Black",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-2_zf16kb.png",
              "propertiesId": ["wXAfnS2RxGqBb"]
       },
       {
              "_id": "dXhHaSyRjNz1p",
              "name": "star dreamer",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-1_pwe071.png",
              "propertiesId": ["lD6xkN4bdvNI9"]
       }
]

