import { useEffect } from 'react'

const useSocketListener = (socket: SocketIOClient.Socket, handlerFn: Function, message: string) => {
    useEffect(() => {
        if (socket) {
            socket.on(message, handlerFn)
        }
    }, [socket])
}

export default useSocketListener