
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay_db'
const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    subscribe

}
window.cs = stayService;


async function query(filterBy = []) {
    console.log(filterBy)
    let filteredStays;
    const { aircon, kitchen, pets, smoking, tv, wifi } = filterBy || {}
    const trues = Object.keys(filterBy).filter(key => filterBy[key]);
    console.log(trues)
    const stays = await storageService.query(STORAGE_KEY)
    console.log(filterBy)
    if (filterBy.length === 0) return stays
    console.log(stays)
    stays.filter((stay) => {
        let currStay = trues.every((amenity) => {
            console.log(amenity)
            return stay.amenities.includes(amenity);
        });
        if (currStay) filteredStays.push(stay);
        return filteredStays
    })
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}
function remove(stayId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, stayId)
}
function save(stay) {
    if (stay._id) {
        return storageService.put(STORAGE_KEY, stay)
    } else {
        stay.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, stay)
    }
}

// function getEmptyStay() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersStaysChanged(stays) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(stays))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(stays => {
            _notifySubscribersStaysChanged(stays)
        })
})

// TEST DATA
// addTestData()
async function addTestData() {
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo001",
            "name": "Jaklino Riso",
            "type": "House",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z8_yd5xza.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z9_ly6miw.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z4_wvbadb.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z6_iwye5p.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z7_vbb404.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z2_m5ydxe.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg"
            ],
            "price": 380.0,
            "summary": "Welcome to my city home. It is centrally located in NYC, just steps from Madison Square Garden and Penn Station to get you off to all your favorite destinations. This apartment makes for lovely weekend stay when I'm not in town - close to attractions, restaurants, nightlife and shopping. Thank you for considering. Please reach out with any questions and I will happily answer them.",
            "capacity": 6,
            "amenities": [],
            "host": { "inside": "userId,userImg,userFullName" },
            "loc": {
                "country": "New-York",
                "countryCode": "NY",
                "address": "Porto, Portugal",
                "lat": 40.73061,
                "lng": -73.935242
            },
            "reviews": [],
            "likedByUsers": ["Mosh Ben Ari", "Moris Boris"]

        }
    )
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo0015",
            "name": "Magical Banna Cabana",
            "type": "Cabin",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z8_yd5xza.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z9_ly6miw.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z4_wvbadb.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z6_iwye5p.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z7_vbb404.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z2_m5ydxe.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg"
            ],
            "price": 133.0,
            "summary": "A cozy and peaceful 2 BR Wood Cabin located in the heart of The Galilee mountains. just by Tabor mountain. the place is in the heart of the beautiful north of Israel. Acre (Akko), the religious city of Safed and the Sea of Galilee. Inside, you will find all the amenities needed, including an equipped kitchen, a seating area with cable TV, and a private indoor hot tub.The guests can enjoy the site's facilities, including a pool, a BBQ spot, and a spacious garden.",
            "capacity": 4,
            "reviews": [],
            "host": {
                "inside": "userId,userImg,userFullName"
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Shadmot-Dvora",
                "lat": 32.69552072742962,
                "lng": 35.43172942172429
            },
            "amenities": [
                {
                    "Bathroom": [
                        "Shampoo",
                        "Hot water"
                    ]
                },
                {
                    "Bedroom and laundry": [
                        "Essentials",
                        "Hangers"
                    ]
                },
                {
                    "Entertainment": [
                        "TV with standard cable",
                        "Suitable for events"
                    ]
                },
                {
                    "Family": [
                        "Crib"
                    ]
                },
                {
                    "Heating and cooling": [
                        "Air conditioning",
                        "Indoor fireplace",
                        "Heating"
                    ]
                },
                {
                    "Home safety": [
                        "Fire extinguisher",
                        "Smoke Alam"
                    ]
                },
                {
                    "Internet and office": [
                        "Wifi",
                        "Dedicated workspace"
                    ]
                },
                {
                    "Kitchen and dining": [
                        "Kitchen",
                        "Cooking basics"
                    ]
                },
                {
                    "Outdoor": [
                        "Patio or balcony",
                        "Backyard"
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Pool"
                    ]
                },
                {
                    "Services": [
                        "Pets allowed",
                        "Smoking allowed",
                        "Long term stays allowed"
                    ]
                },
                {
                    "Not included": [
                        "Security cameras on property",
                        "Hair dryer"
                    ]
                }
            ],
            "likedByUsers": [
                "Mosh Ben Ari",
                "Moris Boris"
            ]
        }
    )
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo002",
            "name": "Ella's cabin",
            "type": "Cabin",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z8_yd5xza.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z9_ly6miw.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z4_wvbadb.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z6_iwye5p.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z7_vbb404.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z2_m5ydxe.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg"
            ],
            "price": 306.0,
            "summary": "With an absolutely stunning view, our cabin offers a beautiful and peaceful place to stay in. The cabin is fully equipped with all the essentials including an oven toaster and a minifridge in the kitchen. Ella's cabin also have it's own private garden, unique sauna cabin and an outdoor round jacuzzi hot tube. The cabin is located on a top of a mountain above the Zavit crick and near a magical, old forest. In the area you can enjoy attractions such as horse riding, ATV trips, hiking and more.",
            "capacity": 6,
            "amenities": [
                {
                    "Bathroom": [
                        "Hair dryer",
                        "Shampoo",
                        "Hot water"
                    ]
                },
                {
                    "Bedroom and laundry": [
                        "Essentials",
                        "Hangers",
                        "Bed linens",
                        "Extra pillows and blankets",
                        "Iron"
                    ]
                },
                {
                    "Entertainment": [
                        "Ethernet connection"
                    ]
                },
                {
                    "Family": [
                        "Fireplace guards"
                    ]
                },
                {
                    "Heating and cooling": [
                        "Air conditioning",
                        "Heating"
                    ]
                },
                {
                    "Home safety": [
                        "Fire extinguisher",
                        "First aid kit",
                        "Smoke alarm"
                    ]
                },
                {
                    "Internet and office": [
                        "Wifi",
                        "Dedicated workspace"
                    ]
                },
                {
                    "Kitchen and dining": [
                        "Kitchen",
                        "Refrigerator",
                        "Cooking basics",
                        "Dishes and silverware",
                        "Stove"
                    ]
                },
                {
                    "Location features": [
                        "Private entrance"
                    ]
                },
                {
                    "Outdoor": [
                        "Patio or balcony",
                        "Backyard"
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Pool",
                        "Private hot tub",
                        "Private sauna"
                    ]
                },
                {
                    "Services": [
                        "Pets allowed",
                        "Long term stays allowed"
                    ]
                },
                {
                    "Not included": [
                        "Securirty cameras on property",
                        "Washer"
                    ]
                }
            ],
            "host": {
                "inside": "userId,userImg,userFullName"
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Abirim",
                "lat": 33.038522896811884,
                "lng": 35.28736201820688
            },
            "reviews": [],
            "likedByUsers": [
                "Mosh Ben Ari",
                "Moris Boris"
            ]
        }
    )
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo003",
            "name": "Sea of Galilee Panoramic View",
            "type": "Cabin",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z8_yd5xza.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z9_ly6miw.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z4_wvbadb.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z6_iwye5p.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z7_vbb404.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z2_m5ydxe.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg"
            ],
            "price": 365.0,
            "summary": "Our Deluxe chalet is a studio chalet - The entire chalet is one open space (except for the bathroom of course…) The chalet has a Living space with T.V, a small basic kitchenette, indoor Jacuzzi and a bathroom with a shower and toilets. From the chalet's balcony you can look over a spectacular view of the Sea of Galilee in all its glory. The Chalet has 1 double bed and 3 sofa beds and fits best for 2 adults and 2 children. We don't recommend it for 2 couples or 5 adults.",
            "capacity": 5,
            "amenities": [
                {
                    "Bathroom": [
                        "Hair dryer",
                        "Shampoo",
                        "Hot water"
                    ]
                },
                {
                    "Bedroom and laundry": [
                        "Essentials",
                        "Bed linens"
                    ]
                },
                {
                    "Entertainment": [
                        "TV"
                    ]
                },
                {
                    "Family": [
                        "Crib"
                    ]
                },
                {
                    "Heating and cooling": [
                        "Air conditioning",
                        "Heating"
                    ]
                },
                {
                    "Home safety": [
                        "Smoke alarm",
                        "First aid kit"
                    ]
                },
                {
                    "Internet and office": [
                        "Wifi",
                        "Dedicated workspace"
                    ]
                },
                {
                    "Kitchen and dining": [
                        "Kitchen",
                        "Refrigerator",
                        "Microwave",
                        "Dishes and silverware",
                        "Coffee maker"
                    ]
                },
                {
                    "Location features": [
                        "Private entrance"
                    ]
                },
                {
                    "Outdoor": [
                        "Patio or balcony",
                        "Backyard",
                        "BBQ grill"
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Pool",
                        "Hot tub"
                    ]
                },
                {
                    "Services": [
                        "Long term stays allowed"
                    ]
                },
                {
                    "Not included": [
                        "Washer",
                        "Securirty cameras on property",
                        "Carbon monoxide alarm"
                    ]
                }
            ],
            "host": {
                "inside": "userId,userImg,userFullName"
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Ramot",
                "lat": 32.85177736295406,
                "lng": 35.676106080178734
            },
            "reviews": [],
            "likedByUsers": [
                "Mosh Ben Ari",
                "Moris Boris"
            ]
        }
    )
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo004",
            "name": "Green Garden Cabin",
            "type": "Cabin",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z8_yd5xza.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520865/imgs/z9_ly6miw.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z4_wvbadb.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z6_iwye5p.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z7_vbb404.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z2_m5ydxe.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642520864/imgs/z5_lpogr7.jpg"
            ],
            "price": 354.0,
            "summary": "If you would like to experience traditional Israeli country life style, our place is ideal. Our place is located in a picturesque farming village which is rich in nature near Golan Heights, Jordan River and the Manara Cliffs. You can enjoy our seasonal citrus fruits and tasty pecan nuts.",
            "capacity": 7,
            "amenities": [
                {
                    "Bathroom": [
                        "Shampoo"
                    ]
                },
                {
                    "Bedroom and laundry": [
                        "Essentials",
                        "Hangers"
                    ]
                },
                {
                    "Entertainment": [
                        "TV"
                    ]
                },
                {
                    "Heating and cooling": [
                        "Air conditioning",
                        "Heating"
                    ]
                },
                {
                    "Home safety": [
                        "Fire extinguisher",
                        "Smoke alarm"
                    ]
                },
                {
                    "Internet and office": [
                        "Wifi",
                        "Dedicated workspace"
                    ]
                },
                {
                    "Kitchen and dining": [
                        "Kitchen"
                    ]
                },
                {
                    "Location features": [
                        "Private entrance"
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Private hot tub"
                    ]
                },
                {
                    "Services": [
                        "Long term stays allowed"
                    ]
                },
                {
                    "Not included": [
                        "Securirty cameras on property",
                        "Washer",
                        "Hair dryer",
                        "Carbon monoxide alarm"
                    ]
                }
            ],
            "host": {
                "inside": "userId,userImg,userFullName"
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Beit Hillel",
                "lat": 33.2149485868632446,
                "lng": 35.61179569215711
            },
            "reviews": [],
            "likedByUsers": [
                "Mosh Ben Ari",
                "Moris Boris"
            ]
        }
    )
}





