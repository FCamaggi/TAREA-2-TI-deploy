import { updateFlightStatus } from './utils';

export const landingMiddleware = (setFlights) => ({
    type: 'landing',
    handler: (message) => updateFlightStatus(setFlights, message)
});