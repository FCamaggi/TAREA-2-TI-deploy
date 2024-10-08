export const updateFlightStatus = (setFlights, message) => {
    setFlights(prevFlights => {
        const flight = prevFlights[message.flight_id] || {};
        return {
            ...prevFlights,
            [message.flight_id]: {
                ...flight,
                status: message.type
            }
        };
    });
};