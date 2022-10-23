import { Server } from 'socket.io';
import { getData, setData } from './data/data.mjs'

const io = new Server(process.env.APP_PORT, {
  cors: {
    origin: process.env.FRONT_ORIGIN,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('getPrice', (data, cb) => {
    return cb(getData('price'))
  })

  socket.on('updatePrice', (data, cb) => {
    if (!!data) {
      setData('price', data)

      return cb('Price list updated')
    } else {
      return cb('Wrong price data from the client!')
    }
  })

  socket.on('getNewOrders', () => {
    socket.emit('newOrderFromServer', getData('orders'))
  })

  socket.on('newOrderFromClient', (data, cb) => {
    setData('orders', getData('orders').unshift(data))
    /* update admin orders */
    socket.broadcast.emit('newOrderFromServer', getData('orders'))

    return cb('ok')
  })

  socket.on('removeOrder', (id, cb) => {
    setData('orders', getData('orders').filter(el => el.id !== id))
    socket.emit('newOrderFromServer', getData('orders'))

    return cb('ok')
  })
});
