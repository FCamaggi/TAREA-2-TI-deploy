export const flightMiddleware = (setFlights) => ({
    type: 'flights',
    handler: (message) => {
        setFlights(prevFlights => {
            const updatedFlights = { ...prevFlights };
            Object.entries(message.flights).forEach(([id, newFlight]) => {
                updatedFlights[id] = {
                    ...updatedFlights[id],
                    ...newFlight
                };
            });
            return updatedFlights;
        });
    }
});