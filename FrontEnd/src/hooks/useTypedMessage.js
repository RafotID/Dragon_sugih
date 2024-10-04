import { useState, useEffect } from "react";
import { wait } from "../shared";

export const useTypedMessage = message => {
    const [typedMessage, setTypeMessage] = useState('')


    useEffect(() => {
        setTypeMessage('')

        if (message.length) {
            (async () => {
                let visibleMessage =''

                for (let i = 0 ; i < message.length ; i++){
                    await wait(25)
                    visibleMessage = visibleMessage+message[i]
                    setTypeMessage(visibleMessage)
                }
            })()
        }

    }, [message])

        return typedMessage
}