import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

const Chat = ({ messages, onSendMessage, isConnected }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Chat
      </Typography>
      <List sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.name}: ${msg.content}`}
              secondary={new Date(msg.date).toLocaleString()}
              primaryTypographyProps={{
                style: { color: msg.level === 'warn' ? 'red' : 'inherit' },
              }}
            />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          fullWidth
          variant="outlined"
          size="small"
          disabled={!isConnected}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ ml: 1 }}
          disabled={!isConnected}
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default Chat;
