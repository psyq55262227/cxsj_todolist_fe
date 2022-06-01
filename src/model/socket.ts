import { getToken } from '@/utils/token'
import io from 'socket.io-client'

const socket = io('localhost:3001', {
  auth: {
    token: getToken(),
  },
})

export default socket
