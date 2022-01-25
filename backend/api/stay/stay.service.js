const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterBy = {}) {
    try {
        const criteria = {} // for now ***********
        // const criteria = _buildCriteria(filterBy) need to build with our fillter ********************
        const collection = await dbService.getCollection('stay')
        const stays = await collection.find(criteria).toArray();
        // var stays = await collection.aggregate([
        //     {
        //         $match: criteria
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // stays = stays.map(stay => {
        //     stay.byUser = { _id: stay.byUser._id, fullName: stay.byUser.fullName }
        //     stay.aboutUser = { _id: stay.aboutUser._id, fullName: stay.aboutUser.fullName }
        //     delete stay.byUserId
        //     delete stay.aboutUserId
        //     return stay
        // })

        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }

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

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                email: txtCriteria
            },
            {
                fullName: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    getStayById

}


