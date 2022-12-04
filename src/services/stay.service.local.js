
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
  addStayMsg,
  getLabels,
  getMaps,

}
window.stayService = stayService


async function query(filterBy) {
  console.log('FROM SERVICE',filterBy)
  const {range,rooms,beds,type,amenities} = filterBy
    var stays = await storageService.query(STORAGE_KEY)
  
    if (range) {
      stays = stays.filter(stay => stay.price >= range[0] && stay.price <= range[1] )
    }
    if (rooms) {
      stays = stays.filter(stay => stay.rooms >= +rooms)
    }
    if(beds){
      stays = stays.filter(stay => stay.beds >= +beds)
    }
    if(type) {
      if(!type.includes('House') && !type.includes('Apartment') && !type.includes('Guesthouse') && !type.includes('Hotel'))return stays
      stays = stays.filter(stay => {
        return type.some(item => stay.type.includes(item))})
    }
    if(amenities){
      stays = stays.filter(stay => {
        return amenities.every(amenity => stay.amenities.includes(amenity))
      })
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId);
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
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY,  {
//       "_id": "10006546",
//         "name": "Ribeira Charming Duplex",
//         "rate":3,
//         "rooms":3,
//         "beds":3,
//         "type": "House",
//         "imgUrls": ["https://res.cloudinary.com/ddt1fjmim/image/upload/v1669815061/002_qnuhwb.jpg", "https://res.cloudinary.com/ddt1fjmim/image/upload/v1669815073/003_jkoxt2.jpg"],
//         "price": 80.00,
//         "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//         "capacity": 8,
//         "amenities": [
//           "TV",
//           "Wifi",
//           "Kitchen",
//           // "Smoking allowed",
//           // "Pets allowed",
//           // "Cooking basics"
//         ],
//         "labels": [
//           "Top of the world",
//           "Trending",
//           "Play",
//           "Tropical"
//         ],
//         "loc": {
//           "country": "United States",
//           "countryCode": "PT",
//           "city": "Maui",
//           "address": "17 Kombo st",
//           "lat": -8.61308,
//           "lng": 41.1413
//         },
//       })
//       await storageService.post(STORAGE_KEY,  {
//         "_id": "10006546",
//         "name": "Ribeira Charming Duplex",
//         "rate":5,
//         "rooms":2,
//         "beds":2,
//         "type": "Hotel",
//         "imgUrls": ["https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg", "https://res.cloudinary.com/ddt1fjmim/image/upload/v1669815082/004_amgrdr.jpg"],
//         "price": 150.00,
//         "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//         "capacity": 8,
//         "amenities": [
//           // "TV",
//           // "Wifi",
//           "Kitchen",
//           "Smoking allowed",
//           "Pets allowed",
//           "Cooking basics"
//         ],
//         "labels": [
//           "Top of the world",
//           "Trending",
//           "Play",
//           "Tropical"
//         ],
//         "loc": {
//           "country": "Spain",
//           "countryCode": "PT",
//           "city": "Madrid",
//           "address": "17 Kombo st",
//           "lat": -8.61308,
//           "lng": 41.1413
//         },
//       })
//       await storageService.post(STORAGE_KEY,  {
//         "_id": "10006546",
//         "name": "Ribeira Charming Duplex",
//         "rate":4,
//         "rooms":1,
//         "beds":1,
//         "type": "Cabin",
//         "imgUrls": ["https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg", "https://res.cloudinary.com/ddt1fjmim/image/upload/v1669815061/002_qnuhwb.jpg"],
//         "price": 250.00,
//         "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//         "capacity": 8,
//         "amenities": [
//           "TV",
//           "Wifi",
//           "Kitchen",
//           "Smoking allowed",
//           "Pets allowed",
//           "Cooking basics"
//         ],
//         "labels": [
//           "Top of the world",
//           "Trending",
//           "Play",
//           "Tropical"
//         ],
//         "loc": {
//           "country": "Portugal",
//           "countryCode": "PT",
//           "city": "Porto",
//           "address": "17 Kombo st",
//           "lat": -8.61308,
//           "lng": 41.1413
//         },
//       })
// })()
function getMaps() {
  return [
    {
      "loc": "I'm flexible",
      src: "src/assets/maps/flexible.jpeg"
    },
    {
      "loc": "Europe",
      src: "src/assets/maps/europe.webp"
    },
    {
      "loc": "France",
      src: "src/assets/maps/france.webp"
    },
    {
      "loc": "United States",
      src: "src/assets/maps/united-state.webp"
    },
    {
      "loc": "United Kingdom",
      src: "src/assets/maps/uk.webp"
    },
    {
      "loc": "South America",
      src: "src/assets/maps/south-america.webp"
    },

  ]
}

function getLabels() {
  return [
    {
      propertyType: "OMG!",
      src: "omg.jpg"
    },
    {
      propertyType: "Amazing views",
      src: "amazing-views.jpg"
    },
    {
      propertyType: "Trending",
      src: "trending.jpg"
    },
    {
      propertyType: "Castels",
      src: "castels.jpg"
    },
    {
      propertyType: "Off-the-grid",
      src: "Off-the-grid.jpg"
    },
    {
      propertyType: "Cabins",
      src: "cabins.jpg"
    },
    {
      propertyType: "Top of the world",
      src: "TOTW.jpg"
    },
    {
      propertyType: "Luxe",
      src: "luxe.jpg"
    },
    {
      propertyType: "Play",
      src: "play.jpg"
    },
    {
      propertyType: "New",
      src: "new.jpg"
    },
    {
      propertyType: "Privte rooms",
      src: "privte-rooms.jpg"
    },



    {
      propertyType: "Beach",
      src: "beach.jpg"
    },
    {
      propertyType: "Apartment",
      src: "Apartment.jpg"
    },
    {
      propertyType: "House",
      src: "house.jpg"
    },
    {
      propertyType: "Townhouse",
      src: "townhouse.jpg"
    },
    {
      propertyType: "Amazing pools",
      src: "amazing-pools.jpg"
    },
    {
      propertyType: "Arctic",
      src: "arctic.jpg"
    },
    {
      propertyType: "Islands",
      src: "islands.jpg"
    },
    {
      propertyType: "Vineyards",
      src: "Vineyards.jpg"
    },
    {
      propertyType: "Lakefront",
      src: "Lakefront.jpg"
    },
    {
      propertyType: "Historical homes",
      src: "Historical-homes.jpg"
    },
    {
      propertyType: "Boats",
      src: "Boats.jpg"
    },
    {
      propertyType: "Ski-in/out",
      src: "Ski-inout.jpg"
    },
    {
      propertyType: "Treehouses",
      src: "Treehouses.jpg"
    },
    {
      propertyType: "Surfing",
      src: "Surfing.jpg"
    },
    {
      propertyType: "Creative spaces",
      src: "Creative-spaces.jpg"
    },
    {
      propertyType: "Golfing",
      src: "Golfing.jpg"
    },
    {
      propertyType: "Desert",
      src: "desert.jpg"
    },
    {
      propertyType: "Campers",
      src: "Campers.jpg"
    },
    {
      propertyType: "Iconic cities",
      src: "Iconic-cities.jpg"
    },
    {
      propertyType: "Windmills",
      src: "Windmills.jpg"
    },
    {
      propertyType: "Shepherd's huts",
      src: "Shepherd's-huts.jpg"
    },
    {
      propertyType: "Ryokans",
      src: "Ryokans.jpg"
    }
  ]
}