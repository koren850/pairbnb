const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterOptions) {
    try {
        const criteria = (Object.values(filterOptions).length) ? _buildCriteria(filterOptions) : {};
    console.log(criteria)
        const collection = await dbService.getCollection('stay')
        const stays = await collection.find(criteria).toArray();
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }

}

function _buildCriteria(filterOptions) {
    let { filterBy, stayPrice, searchParams } = filterOptions;
    filterBy = (filterBy) ? JSON.parse(filterBy) : null;
    stayPrice = (stayPrice) ? JSON.parse(stayPrice) : null;
    searchParams = (searchParams) ? JSON.parse(searchParams) : null;
    const criteria = {};
    if (filterBy) {
        const amenities = {};
        if (filterBy.Wifi) amenities['Internet and office'].Wifi = true;
        if (filterBy.TV) amenities.Entertainment.TV = true;
        if (filterBy.Kitchen) amenities['Kitchen and dining'].Kitchen = true;
        if (filterBy['Air conditioning']) amenities['Heating and cooling']['Air conditioning'] = true;
        if (filterBy['Smoking allowed']) amenities.Services['Smoking allowed'] = true;
        if (filterBy['Pets allowed']) amenities.Services['Pets allowed'] = true;
        criteria.amenities = amenities;
    }
    console.log(filterBy.Wifi);
    if (stayPrice) {
        criteria.price = {$gte:stayPrice.minPrice, $lte: stayPrice.maxPrice}
    }
    if (filterOptions.stayType) {
        const or = [];
        if (stayType["Entire place"]) or.push({ ["Entire place"]: true });
        if (stayType["Hotel room"]) or.push({ ["Hotel room"]: true });
        if (stayType["Private room"]) or.push({ ["Private room"]: true });
        if (stayType["Shared room"]) or.push({ ["Shared room"]: true });
        criteria["type of place"].$or = (or.length) ? or : [];
    }
    if (searchParams) {
        let capacity = (searchParams.guestsCount) ? { $gte: searchParams.guestsCount } : 1;
        let regex = (searchParams.location) ? new RegExp(searchParams.location, 'i') : '';
        const or = (regex) ? [{ country: { $regex: regex } }, { address: { $regex: regex } }] : '';
        criteria.capacity = capacity;
        (or) ? criteria.loc.$or = or : '';
    }
    return criteria;
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


