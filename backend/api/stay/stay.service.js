const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterOptions = {}) {
    try {
        const dudu = (Object.keys(filterOptions).length) ? filterOptions : {};
        const criteria = (Object.keys(dudu).length) ? _buildCriteria(dudu) : dudu;
        // const collection = await dbService.getCollection('stay');
        // const stays = await collection.find({}).toArray();
        // console.log(stays);
        // return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }

}

function _buildCriteria(params) {
    const criteria = {};
    // criteria.capacity = { $gte: params.guestsCount };
    let regex = new RegExp('');
    const or = (regex) ? ([{ country: { $regex: regex } }, { address: { $regex: regex } }]) : '';
    // const or = (regex) ? ([{ name: { $regex: regex } }, { _id: { $regex: regex } }, { price: { $regex: regex } }]) : '';
    // const or = (regex) ? [{ country: { $regex: regex } }, { address: { $regex: regex } }] : '';
    // (or) ? criteria.loc.$or = or : '';
    criteria.loc.$or = or;
    console.log(criteria)
    return criteria;
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


