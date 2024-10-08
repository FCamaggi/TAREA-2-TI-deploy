export const planeMiddleware = (setFlights) => ({
    type: 'plane',
    handler: (message) => {
        setFlights(prevFlights => {
            const flight = prevFlights[message.plane.flight_id] || {};
            return {
                ...prevFlights,
                [message.plane.flight_id]: {
                    ...flight,
                    ...message.plane,
                    position: message.plane.position,
                    ETA: message.plane.ETA,
                    captain: message.plane.captain,
                    status: message.plane.status,
                    airline: message.plane.airline
                }
            };
        });
    }
});