const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}


async function addOrder(req, res) {
    try {
        var order = req.body
        order.byUserId = req.session.user._id
        order = await orderService.add(order)
        // prepare the updated order for sending out
        order.aboutUser = await userService.getById(order.aboutUserId)
        // Give the user credit for adding a order
        var user = await userService.getById(order.byUserId)
        user.score += 10;
        user = await userService.update(user)
        order.byUser = user
        const fullUser = await userService.getById(user._id)

        console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'order-added', data: order, userId: order.byUserId})
        // socketService.emitToUser({type: 'order-about-you', data: order, userId: order.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(order)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

module.exports = {
    getOrders,
    deleteOrder,
    addOrder
}