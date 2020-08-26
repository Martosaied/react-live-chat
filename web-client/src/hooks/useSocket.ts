import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const useSocket = (url: string) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket: any = io(url)
        setSocket(socket)
        return () => socket.disconnect
    }, [url])

    return socket
}

export default useSocket