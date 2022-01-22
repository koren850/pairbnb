
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
    subscribe,
    getDataForPrice

}
window.cs = stayService;

async function query(filterBy, stayType, stayPrice) {
    // console.log(filterBy,stayType)
    console.log('hi queryy')
    let stays = await storageService.query(STORAGE_KEY);
    let filterValues;
    let stayTypeValues;
    // if (stayPrice) {
    const { minPrice, maxPrice } = stayPrice
    let pricedStays = []
    stays.map(stay => {
        if (stay.price >= minPrice && stay.price <= maxPrice) return pricedStays.push(stay)
    })
    // console.log(pricedStays)
    stays = pricedStays
    // console.log(stays)

    if (stayType) stayTypeValues = Object.values(stayType).some(value => value);
    if (filterBy) filterValues = Object.values(filterBy).some(value => value);
    if ((!filterBy || !filterValues) && (!stayType || !stayTypeValues)) return stays;
    if (filterBy && !stayTypeValues) {
        const labels = Object.keys(filterBy).filter(key => filterBy[key]);
        let filteredStays = []
        stays.filter(stay => {
            const stayAmenities = [];
            stay.amenities.forEach(amenity => {
                const [values] = Object.values(amenity)
                values.forEach((value) => stayAmenities.push(value));
            })
            let currStay = labels.every((label) => {
                return stayAmenities.includes(label);
            })
            if (currStay) filteredStays.push(stay);
        })
        return filteredStays
    }
    else if (stayType && !filterValues) {
        const types = Object.keys(stayType).filter(key => stayType[key]);
        let filteredStays = []
        stays.forEach(stay => {
            let currStay = stay["type of place"].includes(types)
            if (currStay) filteredStays.push(stay);
        })
        return filteredStays
    }
    else if (stayType && filterBy) {
        const labels = Object.keys(filterBy).filter(key => filterBy[key]);
        let filteredStays = []
        stays.filter(stay => {
            const stayAmenities = [];
            stay.amenities.forEach(amenity => {
                const [values] = Object.values(amenity)
                values.forEach((value) => stayAmenities.push(value));
            })
            let currStay = labels.every((label) => {
                return stayAmenities.includes(label);
            })
            if (currStay) filteredStays.push(stay);
            return filteredStays
        })
        const filterAndTypeStays = []
        const types = Object.keys(stayType).filter(key => stayType[key]);
        filteredStays.forEach(stay => {
            let currStay = stay["type of place"].includes(types)
            if (currStay) filterAndTypeStays.push(stay);
        })
        return filterAndTypeStays
    }
}
// getDataForPrice()
function getDataForPrice(stays) {
    // const stays = await query()
    console.log(stays)
    let ranges = [{
        key: "*-250",
        to: 250,
        doc_count: 0
    },
    {
        key: "250-300",
        from: 250,
        to: 300,
        doc_count: 0
    },
    {
        key: "300-320",
        from: 300,
        to: 320,
        doc_count: 0
    },
    {
        key: "320-340",
        from: 320,
        to: 340,
        doc_count: 0
    },
    {
        key: "340-360",
        from: 340,
        to: 360,
        doc_count: 0
    },
    {
        key: "360-380",
        from: 360,
        to: 380,
        doc_count: 0
    },
    {
        key: "380-*",
        from: 380,
        doc_count: 0
    }]
    stays.forEach(stay => {
        return ranges.map(range => {
            if (stay.price >= range.from && stay.price < range.to) return range["doc_count"]++
        })
    })
    console.log(ranges)
    return ranges
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
            "type of place": "Entire place",
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
            "amenities": [{
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
            },],
            "host": {
                "_id": 125,
                "fullName": "michael aharoni",
                "imgUrl": 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg',
            },
            "loc": {
                "country": "New-York",
                "countryCode": "NY",
                "address": "Porto, Portugal",
                "lat": 40.73061,
                "lng": -73.935242
            },
            "reviews": [
                {
                    "id": "c002",
                    "txt": "From my top10 vacations ever !",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c003",
                    "txt": "I cant even explain how amazing was the staying... the owner is very kind, the place is warm and clean.",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c005",
                    "txt": "Stunning view, the extra service wasnt so good, (I'm talking about the clean-up and the breakfast).",
                    "rate": 4,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
                },
                {
                    "id": "c006",
                    "txt": "The most peaceful place ever...",
                    "rate": 5,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
                }
            ],
            "likedByUsers": ["Mosh Ben Ari", "Moris Boris"]

        }
    )
    await storageService.post(STORAGE_KEY,
        {
            "_id": "mongo0015",
            "name": "Magical Banna Cabana",
            "type": "Cabin",
            "type of place": "Shared room",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877625/imgs/dca4153e-abae-43c7-a114-5aad07a80cee_ocothx.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877621/imgs/7b5b08c5-2ba4-4019-baad-6bf79bf58c20_nug3vf.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877621/imgs/9bd4007e-2265-4af4-b515-4407904c6a67_vdzpq6.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877620/imgs/1e536207-477e-43c8-8419-7a4311590849_ehgcfs.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877620/imgs/b7258fec-b4e3-4f8e-85bf-d55ca26ad0ba_lfcxx7.jpg",
            ],
            "price": 133.0,
            "summary": "A cozy and peaceful 2 BR Wood Cabin located in the heart of The Galilee mountains. just by Tabor mountain. the place is in the heart of the beautiful north of Israel. Acre (Akko), the religious city of Safed and the Sea of Galilee. Inside, you will find all the amenities needed, including an equipped kitchen, a seating area with cable TV, and a private indoor hot tub.The guests can enjoy the site's facilities, including a pool, a BBQ spot, and a spacious garden.",
            "capacity": 4,
            "host": {
                "_id": 126,
                "fullName": "idan gez",
                "imgUrl": 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg',
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
                        "TV",
                        "Suitable for events"
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
                        "Smoke Alarm"
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
                        "Security cameras",
                        "Hair dryer"
                    ]
                }
            ],
            "reviews": [
                {
                    "id": "c004",
                    "txt": "The cleanest place I have been, very peaceful the view is gorgeous...",
                    "rate": 4.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c001",
                    "txt": "The house was'nt clean enough...",
                    "rate": 3.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c005",
                    "txt": "Stunning view, the extra service wasnt so good, (I'm talking about the clean-up and the breakfast).",
                    "rate": 4,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
                },
                {
                    "id": "c006",
                    "txt": "The most peaceful place ever...",
                    "rate": 5,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
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
            "type of place": "Private room",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877498/imgs/48f19d45-6c06-418f-a881-9ee26edfe6c0_wzqq5e.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877496/imgs/4509c0b5-a038-4ab2-abeb-4ec9c7183898_bolx8b.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877495/imgs/bf0662bc-8aee-4774-9a69-044795e3c8ba_cvzxke.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877494/imgs/bb35384e-5506-4cfa-bb68-e2e8828b3bcc_mrh2s5.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877494/imgs/7d33bda6-bddb-4f51-9389-f464f889e36c_ywoyto.jpg",

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
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Pool",

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
                        "Security cameras",
                        "Washer"
                    ]
                }
            ],
            "host": {
                "_id": 126,
                "fullName": "idan gez",
                "imgUrl": 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg',
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Abirim",
                "lat": 33.038522896811884,
                "lng": 35.28736201820688
            },
            "reviews": [
                {
                    "id": "c001",
                    "txt": "The house was'nt clean enough...",
                    "rate": 3.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c004",
                    "txt": "The cleanest place I have been, very peaceful the view is gorgeous...",
                    "rate": 4.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c005",
                    "txt": "Stunning view, the extra service wasnt so good, (I'm talking about the clean-up and the breakfast).",
                    "rate": 4,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
                },
                {
                    "id": "c006",
                    "txt": "The most peaceful place ever...",
                    "rate": 5,
                    "by": {
                        "_id": 124,
                        "fullname": "koren aharon",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg"
                    }
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
            "_id": "mongo003",
            "name": "Sea of Galilee Panoramic View",
            "type": "Cabin",
            "type of place": "Hotel room",

            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877317/imgs/57e45f1a-c6af-45de-9ec1-435b03d041a8_unwkad.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877318/imgs/e2769c51-7cf1-44b9-bec8-3dcb74e15dbf_cv0ctp.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877317/imgs/b16e309a-4c93-4860-9caa-2960845d39de_ngdxqr.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877317/imgs/5f9fb0db-8286-4710-bc24-bfe25af205b3_zmoxpx.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642877316/imgs/8f0d1db7-d6ef-4998-93c5-1524d1763cda_crlsfh.jpg",
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
                        "BBQ grill"
                    ]
                },
                {
                    "Parking and facilities": [
                        "Free parking on premises",
                        "Pool",

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
                        "Security cameras",
                        "Carbon monoxide alarm"
                    ]
                }
            ],
            "host": {
                "_id": 124,
                "fullName": "koren aharon",
                "imgUrl": 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg',
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Ramot",
                "lat": 32.85177736295406,
                "lng": 35.676106080178734
            },
            "reviews": [
                {
                    "id": "c001",
                    "txt": "The house was'nt clean enough...",
                    "rate": 3.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c002",
                    "txt": "From my top10 vacations ever !",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c003",
                    "txt": "I cant even explain how amazing was the staying... the owner is very kind, the place is warm and clean.",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c004",
                    "txt": "The cleanest place I have been, very peaceful the view is gorgeous...",
                    "rate": 4.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
            ],
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
            "type of place": "Entire place",
            "imgUrls": [
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642875723/imgs/b2a2146b-bd69-4d27-86a8-dd52afc4ba47_hqekl9.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642875724/imgs/05675080-fb37-4ad6-abb1-57baf93b2276_snfopj.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642875722/imgs/4b194ca8-771d-4e51-927c-d01d84c4aed7_h2rwsu.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642875723/imgs/95d98018-d938-49dc-9f7d-bfd5f3a2a726_nsdn12.jpg",
                "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642875721/imgs/ec69ddca-eebc-41b1-88ec-2e35d30ae5ae_1_cahmx0.jpg",
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
                    ]
                },
                {
                    "Services": [
                        "Long term stays allowed"
                    ]
                },
                {
                    "Not included": [
                        "Security cameras",
                        "Washer",
                        "Hair dryer",
                        "Carbon monoxide alarm"
                    ]
                }
            ],
            "host": {
                "_id": 124,
                "fullName": "koren aharon",
                "imgUrl": 'https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/koren_xp3iwz.jpg',
            },
            "loc": {
                "country": "Israel",
                "countryCode": "IL",
                "address": "Beit Hillel",
                "lat": 33.2149485868632446,
                "lng": 35.61179569215711
            },
            "reviews": [
                {
                    "id": "c001",
                    "txt": "The house was'nt clean enough...",
                    "rate": 3.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
                {
                    "id": "c002",
                    "txt": "From my top10 vacations ever !",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c003",
                    "txt": "I cant even explain how amazing was the staying... the owner is very kind, the place is warm and clean.",
                    "rate": 5,
                    "by": {
                        "_id": 126,
                        "fullname": "idan gez",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876792/idan_pdyaio.jpg"
                    }
                },
                {
                    "id": "c004",
                    "txt": "The cleanest place I have been, very peaceful the view is gorgeous...",
                    "rate": 4.5,
                    "by": {
                        "_id": 125,
                        "fullname": "michael aharoni",
                        "imgUrl": "https://res.cloudinary.com/dqj9g5gso/image/upload/v1642876794/michael_c38spz.jpg"
                    }
                },
            ],
            "likedByUsers": []
        }
    )
}





