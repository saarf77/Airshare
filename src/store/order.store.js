import { orderService } from '../../services/order-service.js'
import { stayService } from '../../services/stay-service.js'


export default {
    state: {
      orders: null,
      filterBy: null,
    },
    getters: {
      getOrders(state) {
        return state.orders
      },
    },
    mutations: {
      setOrders(state, { orders }) {
        state.orders = orders
      },
      setFilterBy(state, { filterBy }) {
        state.filterBy = filterBy
      },
      
      removeOrder(state, { orderId }) {
        // var orders = JSON.parse(JSON.stringify(state.orders))
        var orders = state.orders
        var orderIdx = orders.findIndex((order) => order._id === orderId)
        orders.splice(orderIdx, 1)
        state.orders = orders
      },
      addOrder(state, { order }) {
        state.orders.push(order)
      },
  
      updateOrder(state, { order }) {
        const idx = state.orders.findIndex((currOrder) => currOrder._id === order._id)
        state.orders.splice(idx, 1, order)
      },
    },
    actions: {
      async loadOrders(context) {
        try {
          const orders = await orderService.getOrders(filterBy)
          context.commit({ type: 'setOrders', orders: orders })
          return orders
        } catch (err) {
          console.log(err)
        }
      },
      async getOrderById(context, { orderId }) {
        try {
          return await orderService.getById(orderId)
        } catch (err) {
          console.log(err)
        }
      },
      getEmptyOrder() {
        return orderService.getEmptyOrder()
      },
      async removeOrder(context, { orderId }) {
        try {
          await orderService.removeOrder(orderId)
          context.commit({ type: 'removeOrder', orderId })
          return
        } catch (err) {
          console.log(err)
        }
      },
      async saveOrder(context, { order }) {
        try {
          const isEdit = !!order._id
          const savedOrder = await orderService.saveOrder(order)
          console.log(savedOrder)
          context.commit({ type: isEdit ? 'updateOrder' : 'addOrder', order: savedOrder })
        } catch (err) {
          console.log(err)
        }
      }
    }
}
