export const acceptedMiddleware = () => ({
    type: 'accepted',
    handler: (message) => {
        console.log('Conexión aceptada:', message);
    }
});