import { updateFlightStatus } from './utils';

export const takeOffMiddleware = (setFlights) => ({
    type: 'take-off',
    handler: (message) => updateFlightStatus(setFlights, message)
});