import { flightMiddleware } from './flightMiddleware';
import { planeMiddleware } from './planeMiddleware';
import { takeOffMiddleware } from './takeOffMiddleware';
import { landingMiddleware } from './landingMiddleware';
import { crashedMiddleware } from './crashedMiddleware';
import { chatMiddleware } from './chatMiddleware';
import { acceptedMiddleware } from './acceptedMiddleware';

export const createMessageHandler = (setFlights, setMessages) => {
    const middlewares = [
        acceptedMiddleware(),
        flightMiddleware(setFlights),
        planeMiddleware(setFlights),
        takeOffMiddleware(setFlights),
        landingMiddleware(setFlights),
        crashedMiddleware(setFlights),
        chatMiddleware(setMessages)
    ];

    return (message) => {
        const { type } = message;
        const middleware = middlewares.find(m => m.type === type);
        if (middleware) {
            middleware.handler(message);
        } else {
            console.log('Tipo de mensaje no manejado:', type);
        }
    };
};