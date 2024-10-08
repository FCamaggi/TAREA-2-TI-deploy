import React, { useState, useRef, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';

import FlightMap from './components/FlightMap';
import FlightTable from './components/FlightTable';
import Chat from './components/Chat';
import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from './services/websocket';
import { createMessageHandler } from './middlewares';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [flights, setFlights] = useState({});
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const handleWebSocketMessage = useCallback((data) => {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error('Error al parsear el mensaje:', error);
        return;
      }
    }

    if (typeof data !== 'object' || data === null || !data.type) {
      console.error('Mensaje recibido en formato incorrecto:', data);
      return;
    }

    const messageHandler = createMessageHandler(
      (updateFunction) =>
        setFlights((prevFlights) => updateFunction(prevFlights)),
      setMessages
    );
    console.log('Mensaje recibido:', data);
    messageHandler(data);
  }, []);

  const handleJoin = () => {
    if (!isConnected) {
      const newSocket = connectWebSocket();
      socketRef.current = newSocket;

      newSocket.onopen = () => {
        setIsConnected(true);
        sendMessage(newSocket, {
          type: 'join',
          id: '18625193',
          username: 'FCamaggi',
        });
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      newSocket.onclose = () => {
        setIsConnected(false);
      };
    }
  };

  const handleDisconnect = () => {
    if (isConnected && socketRef.current) {
      disconnectWebSocket(socketRef.current);
      setIsConnected(false);
      socketRef.current = null;
    }
  };

  const handleSendMessage = (content) => {
    if (isConnected && socketRef.current) {
      sendMessage(socketRef.current, {
        type: 'chat',
        content: content,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Toolbar>
          <Typography variant="h6">Sistema de Seguimiento de Vuelos</Typography>
        </Toolbar>
        <Box sx={{ mb: 2 }}>
          {!isConnected ? (
            <Button variant="contained" color="primary" onClick={handleJoin}>
              Unirse
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDisconnect}
            >
              Desconectar
            </Button>
          )}
        </Box>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500,
                }}
              >
                <FlightMap flights={flights} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500,
                }}
              >
                <Chat
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isConnected={isConnected}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
              >
                <FlightTable flights={flights} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
