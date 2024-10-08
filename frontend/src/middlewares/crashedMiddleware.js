import { updateFlightStatus } from './utils';

export const crashedMiddleware = (setFlights) => ({
    type: 'crashed',
    handler: (message) => updateFlightStatus(setFlights, message)
});