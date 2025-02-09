import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('no order items')
    }else{
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
})
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order){
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
})
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true,
        order.paidAt,
        order.paymentMethod = {
            id: req.body.id,
            status: req.body.status,
            udpate_time: req.body.udpate_time,
            email_address: req.body.email_address,
        }
        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered')
})
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders')
})

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}