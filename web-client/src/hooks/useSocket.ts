import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const useSocket = (url: string) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket>()

    useEffect((): (() => void) => {
        const socket: SocketIOClient.Socket = io(url)
        setSocket(socket)
        return () => socket.disconnect
    }, [url])

    return socket
}

export default useSocket