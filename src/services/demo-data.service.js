import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STAYS_KEY = 'stays-db';
const USERS_KEY = 'users-db';




export const stayService = {
       query,
       getById,
       save,
       remove,
       getEmptyStay,
       addStayMsg
}
   
// ;(async () =>{
//        const stays = await storageService.query(STAYS_KEY);
//        if(stays?.length === 0) storageService.save(STAYS_KEY, demoStays);

//        const users = await storageService.query(USERS_KEY);
//        if(users?.length === 0) storageService.save(USERS_KEY, demoUsers);
// })();


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
   
async function getById(Id, collectionName) {
       switch (collectionName) {
              case 'stays-db':
                     return await storageService.get(STAYS_KEY, Id);
              case 'stays-owner':
                     const users = await storageService.query(USERS_KEY);
                     const stay = await storageService.get(STAYS_KEY, Id);
                     let currUser = users.filter((user)=>{
                            return user._id === stay.ownerId;
                     });
                     return currUser[0];
              case 'users-db':
                     const usersList = await storageService.query(USERS_KEY);
                     return usersList.filter((user)=>{
                                   return user._id === Id;
                            }); 
               case 'order-db':
                     const orderList = await storageService.query(ORDERS_KEY);
                     return orderList.filter((order)=>{
                     return order._id === Id;
              }); 
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
// 3 =>       http://localhost:5173/#/details/wXAfnS2RxGqBb


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
              "detailedDescription": "snowCabin",
              "capacity": 8,
              "amenities": [
                     {"amenitieType": "bay-view", "svgName": "bayView", "txt": "Bay view"},
                     {"amenitieType": "hair-dryer", "svgName": "hairDryer", "txt": "Hair dryer"},
                     {"amenitieType": "garden", "svgName": "gardenIcon", "txt": "Private backyard – Fully fenced"},
                     {"amenitieType": "balcony", "svgName": "balconyIcon", "txt": "Private patio or balcony"},
                     {"amenitieType": "pool", "svgName": "swimmingPool", "txt": "Private pool"},
                     
                     {"amenitieType": "hot tub", "svgName": "hotTub", "txt": "Private hot tub"},
                     {"amenitieType": "wifi", "svgName": "wifiIcon", "txt": "Wifi"},
                     {"amenitieType": "essentials", "svgName": "essentialsIcon", "txt": "Essentials"},
                     {"amenitieType": "heating", "svgName": "heatingIcon", "txt": "Heating"},
                     {"amenitieType": "fire extinguisher", "svgName": "tvIcon", "txt": "Fire extinguisher"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},

                     {"amenitieType": "Smoking allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Pets allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Cooking basics", "svgName": "tvIcon", "txt": "TV"},
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
                            "user_id": "7162cX5cTf68l",
                            "starRate": 4.3,
                            "content": "Super nice family. Very pleasant stay. Nice peaceful location. Couldn’t ask for more.",
                            "reviewPostDate": 1600000638437,
                            "attributes": {
                                  "cleanliness": 3.9,
                                   "communication": 4.5,
                                   "checkIn": 5.0,

                                   "accuracy": 3.2,
                                   "location": 4.7,
                                   "value": 2.9,
                            }
                     },{
                            "user_id": "7N4OEdLC2BfjT",
                            "starRate": 4.1,
                            "content": `I have been here for 3 months, and I can say that is an incredible good family.They care about everything, if you need something you can trust that they are going to help you.
                            GREEN, quiet and beautiful place. You can fell the good vibes of the house immediately. 100% recommended.`,
                            "reviewPostDate": 1625500638437,
                            "attributes": {
                                   "cleanliness": 3.7,
                                   "communication": 4.2,
                                   "checkIn": 4.7,

                                   "accuracy": 3.7,
                                   "location": 5,
                                   "value": 3.5,
                            }
                     },{
                            "user_id": "7hlo5eR0X666L",
                            "starRate": 5.0,
                            "content": `Booked it spontaneusly out of the blue, because of the positive reviews over here and I just can assure, they were all true!! Yaron is such a nice and decent host, who gives you all the opportunities to enjoy your holidays in a great and original israelian way.
                            His house is a great place to stay, always clean and very organized. You just need to follow the few easy rules and enjoy the beautifully renovated flat.
                            The 2 rooms he is renting have a lot of space, a big TV with access to Netflix, a very good queensize bed with really cosy sheets, a good climate machine and a roof ventilation too.
                            Walking to the beach (20 minutes if you are a quick walker) is always a nice experience, cause the appartement is right next to the amazing Levinsky Market and Florentine.
                            All in all the level of cost and quality and Yarons way of hosting guests is definitely worth 5*****!!!! Thanks for the amazing stay!!! With love from Vienna, Barbara`,
                            "reviewPostDate": 1627500638437,
                            "attributes": {
                                   "cleanliness": 5.0,
                                   "communication": 5.0,
                                   "checkIn": 5.0,

                                   "accuracy": 5.0,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
                     },{
                            "user_id": "a4D67ti7Jv8jI",
                            "starRate": 4.1,
                            "content": `Yaron has been an exceptional host for my month long stay at his Airbnb... It felt like home the moment I walked through the door.
                            The bed is very comfortable and the room is a great size and easy location to get around the city. I'd recommend Yaron's place for any length of stay.`,
                            "reviewPostDate": 1631500638437,
                            "attributes": {
                                   "cleanliness": 3.8,
                                   "communication": 4.5,
                                   "checkIn": 3.5,

                                   "accuracy": 3.6,
                                   "location": 4.4,
                                   "value": 4.0,
                            }
                     },{
                            "user_id": "0ftUf74t6ZUzu",
                            "starRate": 4.3,
                            "content": `Beautifully set cabin just north of Oslo. We used it as a first stop of our small Norway tour. 
                            Starting points of various hikes are nearby. The lakes is beautiful and we stook a swim after a warm day. 
                            Shops are not nearby so bring your groceries for a few days. We love the place!`,
                            "reviewPostDate": 1647700638437,
                            "attributes": {
                                   "cleanliness": 2.9,
                                   "communication": 4.1,
                                   "checkIn": 2.0,

                                   "accuracy": 4.2,
                                   "location": 4.5,
                                   "value": 4.7,
                            }
                     },{
                            "user_id": "6fun6fun6fun6",
                            "starRate": 2.1,
                            "content": `Great cabin in a quiet, beautiful place!

                            We had lots of snow during our stay, and the road was cleared well, parking was close (5 min walk) from the cabin. Would recommend a 4x4 in winter.
                            
                            The cabin is cozy, has a nice kitchen, very effective heating and good lighting throughout. We had a great stay, spent the days outside playing in the snow, seeing and reading books in front of the fireplace. Water is easily available outside the cabin, and can be poured into a water system inside (we didn't bother using it).
                            
                            All in all a great weekend, and we will definitely come back sometime!`,
                            "reviewPostDate": 1632700638437,
                            "attributes": {
                                   "cleanliness": 1.1,
                                   "communication": 2.7,
                                   "checkIn": 0.7,

                                   "accuracy": 2.2,
                                   "location": 3.0,
                                   "value": 2.0,
                            }
                     },{
                            "user_id": "Hl6Kk4Ce9yrMr",
                            "starRate": 4.7,
                            "content": `This cabin is beautifully situated in the woods. You can find a couple of great hikes in the neighborhood.
                            The cabin, however, is outdated and wasn't very clean when we arrived.`,
                            "reviewPostDate": 1661100638437,
                            "attributes": {
                                   "cleanliness": 4.7,
                                   "communication": 4.8,
                                   "checkIn": 5.0,

                                   "accuracy": 4.2,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
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
              "detailedDescription": "cottageByTheSea",
              "capacity": 8,
              "amenities": [
                     {"amenitieType": "Desert view", "svgName": "desertView", "txt": "Desert View"},
                     {"amenitieType": "Mountain view", "svgName": "mountainsView", "txt": "Mountains view"},
                     {"amenitieType": "Wifi", "svgName": "wifiIcon", "txt": "Fast wifi – 362 Mbps"},
                     {"amenitieType": "Workspace", "svgName": "workDesk", "txt": "Dedicated workspace"},
                     {"amenitieType": "Hot tub", "svgName": "hotTub", "txt": "Private hot tub"},
                     
                     {"amenitieType": "Garden", "svgName": "gardenIcon", "txt": "Garden view"},
                     {"amenitieType": "Wifi", "svgName": "wifiIcon", "txt": "Wifi"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Air conditioner", "svgName": "airConditioner", "txt": "Air conditioning"},
                     {"amenitieType": "fireplace", "svgName": "fireplaceIcon", "txt": "Indoor fireplace"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},

                     {"amenitieType": "Smoking allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Pets allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Cooking basics", "svgName": "tvIcon", "txt": "TV"},
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
                            "user_id": "7162cX5cTf68l",
                            "starRate": 4.3,
                            "content": "Super nice family. Very pleasant stay. Nice peaceful location. Couldn’t ask for more.",
                            "reviewPostDate": 1600000638437,
                            "attributes": {
                                  "cleanliness": 3.9,
                                   "communication": 4.5,
                                   "checkIn": 5.0,

                                   "accuracy": 3.2,
                                   "location": 4.7,
                                   "value": 2.9,
                            }
                     },{
                            "user_id": "7N4OEdLC2BfjT",
                            "starRate": 4.1,
                            "content": `I have been here for 3 months, and I can say that is an incredible good family.They care about everything, if you need something you can trust that they are going to help you.
                            GREEN, quiet and beautiful place. You can fell the good vibes of the house immediately. 100% recommended.`,
                            "reviewPostDate": 1625500638437,
                            "attributes": {
                                   "cleanliness": 3.7,
                                   "communication": 4.2,
                                   "checkIn": 4.7,

                                   "accuracy": 3.7,
                                   "location": 5,
                                   "value": 3.5,
                            }
                     },{
                            "user_id": "7hlo5eR0X666L",
                            "starRate": 5.0,
                            "content": `Booked it spontaneusly out of the blue, because of the positive reviews over here and I just can assure, they were all true!! Yaron is such a nice and decent host, who gives you all the opportunities to enjoy your holidays in a great and original israelian way.
                            His house is a great place to stay, always clean and very organized. You just need to follow the few easy rules and enjoy the beautifully renovated flat.
                            The 2 rooms he is renting have a lot of space, a big TV with access to Netflix, a very good queensize bed with really cosy sheets, a good climate machine and a roof ventilation too.
                            Walking to the beach (20 minutes if you are a quick walker) is always a nice experience, cause the appartement is right next to the amazing Levinsky Market and Florentine.
                            All in all the level of cost and quality and Yarons way of hosting guests is definitely worth 5*****!!!! Thanks for the amazing stay!!! With love from Vienna, Barbara`,
                            "reviewPostDate": 1627500638437,
                            "attributes": {
                                   "cleanliness": 5.0,
                                   "communication": 5.0,
                                   "checkIn": 5.0,

                                   "accuracy": 5.0,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
                     },{
                            "user_id": "a4D67ti7Jv8jI",
                            "starRate": 4.1,
                            "content": `Yaron has been an exceptional host for my month long stay at his Airbnb... It felt like home the moment I walked through the door.
                            The bed is very comfortable and the room is a great size and easy location to get around the city. I'd recommend Yaron's place for any length of stay.`,
                            "reviewPostDate": 1631500638437,
                            "attributes": {
                                   "cleanliness": 3.8,
                                   "communication": 4.5,
                                   "checkIn": 3.5,

                                   "accuracy": 3.6,
                                   "location": 4.4,
                                   "value": 4.0,
                            }
                     },{
                            "user_id": "0ftUf74t6ZUzu",
                            "starRate": 4.3,
                            "content": `Beautifully set cabin just north of Oslo. We used it as a first stop of our small Norway tour. 
                            Starting points of various hikes are nearby. The lakes is beautiful and we stook a swim after a warm day. 
                            Shops are not nearby so bring your groceries for a few days. We love the place!`,
                            "reviewPostDate": 1647700638437,
                            "attributes": {
                                   "cleanliness": 2.9,
                                   "communication": 4.1,
                                   "checkIn": 2.0,

                                   "accuracy": 4.2,
                                   "location": 4.5,
                                   "value": 4.7,
                            }
                     },{
                            "user_id": "6fun6fun6fun6",
                            "starRate": 2.1,
                            "content": `Great cabin in a quiet, beautiful place!

                            We had lots of snow during our stay, and the road was cleared well, parking was close (5 min walk) from the cabin. Would recommend a 4x4 in winter.
                            
                            The cabin is cozy, has a nice kitchen, very effective heating and good lighting throughout. We had a great stay, spent the days outside playing in the snow, seeing and reading books in front of the fireplace. Water is easily available outside the cabin, and can be poured into a water system inside (we didn't bother using it).
                            
                            All in all a great weekend, and we will definitely come back sometime!`,
                            "reviewPostDate": 1632700638437,
                            "attributes": {
                                   "cleanliness": 1.1,
                                   "communication": 2.7,
                                   "checkIn": 0.7,

                                   "accuracy": 2.2,
                                   "location": 3.0,
                                   "value": 2.0,
                            }
                     },{
                            "user_id": "Hl6Kk4Ce9yrMr",
                            "starRate": 4.7,
                            "content": `This cabin is beautifully situated in the woods. You can find a couple of great hikes in the neighborhood.
                            The cabin, however, is outdated and wasn't very clean when we arrived.`,
                            "reviewPostDate": 1661100638437,
                            "attributes": {
                                   "cleanliness": 4.7,
                                   "communication": 4.8,
                                   "checkIn": 5.0,

                                   "accuracy": 4.2,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
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
              "detailedDescription": "rentACastle",
              "capacity": 8,
              "amenities": [
                     {"amenitieType": "bay-view", "svgName": "bayView", "txt": "Bay view"},
                     {"amenitieType": "Pool", "svgName": "waterFront", "txt": "easy access to the pool"},
                     {"amenitieType": "Kitchen", "svgName": "kitchenIcon", "txt": "Kitchen"},
                     {"amenitieType": "Elevator", "svgName": "elevatorIcon", "txt": "Elevator"},
                     {"amenitieType": "Hot tub", "svgName": "hotTub", "txt": "Hot tub"},
                     
                     {"amenitieType": "parking", "svgName": "freeParkingPremies", "txt": "Free parking on premises"},
                     {"amenitieType": "Wifi", "svgName": "wifiIcon", "txt": "Wifi"},
                     {"amenitieType": "Free washer", "svgName": "washerUnit", "txt": "Free washer - In unit"},
                     {"amenitieType": "Free dryer", "svgName": "dryerUnit", "txt": "Free dryer - In unit"},
                     {"amenitieType": "Carbon monoxide alarm", "svgName": "carbonMonoxideAlarm", "txt": "carbon-monoxide alert system"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "TV", "svgName": "tvIcon", "txt": "TV"},

                     {"amenitieType": "Smoking allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Pets allowed", "svgName": "tvIcon", "txt": "TV"},
                     {"amenitieType": "Cooking basics", "svgName": "tvIcon", "txt": "TV"},
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
                            "user_id": "7162cX5cTf68l",
                            "starRate": 4.3,
                            "content": "Super nice family. Very pleasant stay. Nice peaceful location. Couldn’t ask for more.",
                            "reviewPostDate": 1600000638437,
                            "attributes": {
                                  "cleanliness": 3.9,
                                   "communication": 4.5,
                                   "checkIn": 5.0,

                                   "accuracy": 3.2,
                                   "location": 4.7,
                                   "value": 2.9,
                            }
                     },{
                            "user_id": "7N4OEdLC2BfjT",
                            "starRate": 4.1,
                            "content": `I have been here for 3 months, and I can say that is an incredible good family.They care about everything, if you need something you can trust that they are going to help you.
                            GREEN, quiet and beautiful place. You can fell the good vibes of the house immediately. 100% recommended.`,
                            "reviewPostDate": 1625500638437,
                            "attributes": {
                                   "cleanliness": 3.7,
                                   "communication": 4.2,
                                   "checkIn": 4.7,

                                   "accuracy": 3.7,
                                   "location": 5,
                                   "value": 3.5,
                            }
                     },{
                            "user_id": "7hlo5eR0X666L",
                            "starRate": 5.0,
                            "content": `Booked it spontaneusly out of the blue, because of the positive reviews over here and I just can assure, they were all true!! Yaron is such a nice and decent host, who gives you all the opportunities to enjoy your holidays in a great and original israelian way.
                            His house is a great place to stay, always clean and very organized. You just need to follow the few easy rules and enjoy the beautifully renovated flat.
                            The 2 rooms he is renting have a lot of space, a big TV with access to Netflix, a very good queensize bed with really cosy sheets, a good climate machine and a roof ventilation too.
                            Walking to the beach (20 minutes if you are a quick walker) is always a nice experience, cause the appartement is right next to the amazing Levinsky Market and Florentine.
                            All in all the level of cost and quality and Yarons way of hosting guests is definitely worth 5*****!!!! Thanks for the amazing stay!!! With love from Vienna, Barbara`,
                            "reviewPostDate": 1627500638437,
                            "attributes": {
                                   "cleanliness": 5.0,
                                   "communication": 5.0,
                                   "checkIn": 5.0,

                                   "accuracy": 5.0,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
                     },{
                            "user_id": "a4D67ti7Jv8jI",
                            "starRate": 4.1,
                            "content": `Yaron has been an exceptional host for my month long stay at his Airbnb... It felt like home the moment I walked through the door.
                            The bed is very comfortable and the room is a great size and easy location to get around the city. I'd recommend Yaron's place for any length of stay.`,
                            "reviewPostDate": 1631500638437,
                            "attributes": {
                                   "cleanliness": 3.8,
                                   "communication": 4.5,
                                   "checkIn": 3.5,

                                   "accuracy": 3.6,
                                   "location": 4.4,
                                   "value": 4.0,
                            }
                     },{
                            "user_id": "0ftUf74t6ZUzu",
                            "starRate": 4.3,
                            "content": `Beautifully set cabin just north of Oslo. We used it as a first stop of our small Norway tour. 
                            Starting points of various hikes are nearby. The lakes is beautiful and we stook a swim after a warm day. 
                            Shops are not nearby so bring your groceries for a few days. We love the place!`,
                            "reviewPostDate": 1647700638437,
                            "attributes": {
                                   "cleanliness": 2.9,
                                   "communication": 4.1,
                                   "checkIn": 2.0,

                                   "accuracy": 4.2,
                                   "location": 4.5,
                                   "value": 4.7,
                            }
                     },{
                            "user_id": "6fun6fun6fun6",
                            "starRate": 2.1,
                            "content": `Great cabin in a quiet, beautiful place!

                            We had lots of snow during our stay, and the road was cleared well, parking was close (5 min walk) from the cabin. Would recommend a 4x4 in winter.
                            
                            The cabin is cozy, has a nice kitchen, very effective heating and good lighting throughout. We had a great stay, spent the days outside playing in the snow, seeing and reading books in front of the fireplace. Water is easily available outside the cabin, and can be poured into a water system inside (we didn't bother using it).
                            
                            All in all a great weekend, and we will definitely come back sometime!`,
                            "reviewPostDate": 1632700638437,
                            "attributes": {
                                   "cleanliness": 1.1,
                                   "communication": 2.7,
                                   "checkIn": 0.7,

                                   "accuracy": 2.2,
                                   "location": 3.0,
                                   "value": 2.0,
                            }
                     },{
                            "user_id": "Hl6Kk4Ce9yrMr",
                            "starRate": 4.7,
                            "content": `This cabin is beautifully situated in the woods. You can find a couple of great hikes in the neighborhood.
                            The cabin, however, is outdated and wasn't very clean when we arrived.`,
                            "reviewPostDate": 1661100638437,
                            "attributes": {
                                   "cleanliness": 4.7,
                                   "communication": 4.8,
                                   "checkIn": 5.0,

                                   "accuracy": 4.2,
                                   "location": 5.0,
                                   "value": 5.0,
                            }
                     },
              ]
       }
]

const demoUsers = [
       {
              "_id": "WbYTQf8YP2ezO",
              "name": "Mister Red",
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
              "name": "Star Dreamer",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-1_pwe071.png",
              "propertiesId": ["lD6xkN4bdvNI9"]
       },

       {
              
              "_id": "7162cX5cTf68l",
              "name": "Eyes Matter",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-10_wam74m.png",
              "propertiesId": []
       },
       {
              
              "_id": "7N4OEdLC2BfjT",
              "name": "Heavy Metal",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099516/user-11_zytml0.png",
              "propertiesId": []
       },
       {
              
              "_id": "7hlo5eR0X666L",
              "name": "Game of Chairs",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099516/user-12_wslgxy.png",
              "propertiesId": []
       },
       {
              "_id": "a4D67ti7Jv8jI",
              "name": "Mind Mistress",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-13_zeuri6.png",
              "propertiesId": []
       },
       {
              "_id": "0ftUf74t6ZUzu",
              "name": "White Wires 49",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-14_ow2as4.png",
              "propertiesId": []
       },
       {
              "_id": "6fun6fun6fun6",
              "name": "ForTheFun",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-15_intfaj.png",
              "propertiesId": []
       },
       {
              "_id": "Hl6Kk4Ce9yrMr",
              "name": "rouge474",
              "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670100293/user-16_twzwub.png",
              "propertiesId": []
       }   
]

