export const chatMiddleware = (setMessages) => ({
    type: 'message',
    handler: (message) => {
        setMessages(prevMessages => [...prevMessages, message.message]);
    }
});