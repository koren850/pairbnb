
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const stayService = require('../stay/stay.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query() {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('user');
        let users = await collection.find(criteria).toArray();
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            return user;
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        console.log('getUserById')
        const collection = await dbService.getCollection('user');
        const user = await collection.findOne({ _id: ObjectId(userId) });
        delete user.password;
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`while finding user ${email}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id), // needed for the returnd obj
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            imgUrl: user.imgUrl,
            likedStays: user.likedStays,
            isSocial: user.isSocial,
            notifications: user.notifications
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })

        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            imgUrl: user.imgUrl,
            likedStays: user.likedStays,
            isSocial: user.isSocial
        }
        const collection = await dbService.getCollection('user');
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

