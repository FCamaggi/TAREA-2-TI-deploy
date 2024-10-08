import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const FlightTable = ({ flights }) => {
  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Vuelos
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID de Vuelo</TableCell>
              <TableCell>Origen</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Capitán</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(flights).map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.departure?.name || 'N/A'}</TableCell>
                <TableCell>{flight.destination?.name || 'N/A'}</TableCell>
                <TableCell>
                  {flight.ETA ? `${Math.floor(flight.ETA)} minutos` : 'N/A'}
                </TableCell>
                <TableCell>{flight.captain || 'N/A'}</TableCell>
                <TableCell>{flight.status || 'En vuelo'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

FlightTable.propTypes = {
  flights: PropTypes.object.isRequired,
};

export default FlightTable;
