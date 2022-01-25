const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterOptions) {
    try {
        // console.log(filterOptions)
        const criteria = (Object.values(filterOptions).length) ? _buildCriteria(filterOptions) : {};
        console.log(criteria, 'after criteria')
        const collection = await dbService.getCollection('stay')
        // console.log(collection)
        const stays = await collection.find(criteria).toArray();
        // console.log(stays)
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }

}

function _buildCriteria(filterOptions) {
    let { searchParams } = filterOptions;
    // filterBy = (filterBy) ? JSON.parse(filterBy) : null;
    // stayPrice = (stayPrice) ? JSON.parse(stayPrice) : null;
    searchParams = (searchParams) ? JSON.parse(searchParams) : null;
    console.log(searchParams)
    const criteria = {};
    // if (filterBy) {
    //     let amenities = [];
    //     if (filterBy.Wifi) amenities['Internet and office'] = 'Wifi'
    //     if (filterBy.TV) amenities['Entertainment'] = 'TV'
    //     if (filterBy.Kitchen) amenities['Kitchen and dining'] = 'Kitchen'
    //     if (filterBy['Air conditioning']) amenities['Heating and cooling'] = 'Air conditioning'
    //     if (filterBy['Smoking allowed']) amenities['Services'] = 'Smoking allowed'
    //     if (filterBy['Pets allowed']) amenities['Services'] = 'Pets allowed'
    //     if (filterBy['Smoking allowed'] && filterBy['Pets allowed']) amenities['Services'] = ['Smoking allowed', 'Pets allowed']
    //     // criteria.amenities = { $all: amenities };
    //     criteria.amenities =  amenities ;
    // }
    // if (stayPrice) {
    //     criteria.price = { $gte: stayPrice.minPrice, $lte: stayPrice.maxPrice }
    // }
    // if (filterOptions.stayType) {
    //     const or = [];
    //     if (stayType["Entire place"]) or.push({ ["Entire place"]: true });
    //     if (stayType["Hotel room"]) or.push({ ["Hotel room"]: true });
    //     if (stayType["Private room"]) or.push({ ["Private room"]: true });
    //     if (stayType["Shared room"]) or.push({ ["Shared room"]: true });
    //     criteria["type of place"].$or = (or.length) ? or : [];
    // }
    if (searchParams) {
        let capacity = (searchParams.guestsCount) ? { $gte: searchParams.guestsCount } : 1;
        criteria.capacity = capacity;
        // let regex = (searchParams.location) ? new RegExp(searchParams.location) : '';
        //     criteria.price = { $gte: stayPrice.minPrice, $lte: stayPrice.maxPrice }
        // console.log(regex)
        // const or = { $or: [{ country: { $regex: regex} }, { address: { $regex: regex} }] };
        // const or = [{ country: { $regex: '/Shadmot-Dvora/', $options: 'i' } }, { address: { $regex: regex, $options: 'i' } }];
        const txtCriteria = { $regex: searchParams.location, $options: 'i' }
        console.log('txtCriteria', txtCriteria)
        // console.log('criteria1', criteria)
        console.log('criteria1', criteria)
        criteria.$or = [{ country: txtCriteria }, { adress: txtCriteria }]
        console.log('criteria2', criteria)
    }
    console.log('criteria', criteria)
    return criteria;


    // const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    // criteria.$or = [{ username: txtCriteria }, { fullname: txtCriteria }]
    // return criteria
    //     let regex = (filterBy.content) ? new RegExp(filterBy.content, 'i') : '';
    //     let criteria = {};
    // (filterBy.status) ? ((filterBy.status === 'true') ? criteria.inStock=true: criteria.inStock = false) : '';
    // const or = (regex) ? ([{name:{$regex:regex}},{_id:{$regex:regex}},{price:{$regex:regex}}]) : '';
    // filterBy.labels ? criteria.labels = {$all:filterBy.labels.split(',')} : '';
    // (or) ? criteria.$or = or : '';
}

async function getStayById(stayId) {
    try {
        const collection = await dbService.getCollection('stay');
        const stay = await collection.findOne({ _id: ObjectId(stayId) });
        return stay
    } catch (err) {
        logger.error(`while finding user ${stayId}`, err)
        throw err
    }
}


async function remove(stayId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('stay')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(stayId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}


async function add(stay) {
    try {
        const stayToAdd = {
            byUserId: ObjectId(stay.byUserId),
            aboutUserId: ObjectId(stay.aboutUserId),
            txt: stay.txt,
            name: stay.name,
            type: stay.type,
            imgUrls: stay.imgUrls,
            price: stay.price,
            summary: stay.summary,
            capacity: stay.capacity,
            amenities: stay.amenities,
            host: stay.host,
            loc: stay.loc,
            reviews: stay.reviews,
            likedByUsers: stay.likedByUsers
        }
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stayToAdd)
        return stayToAdd;
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getStayById

}


