const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];

let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);
  io.on('connection', (socket) => {
    const { latitude, longitude, technologies } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      technologies: parseStringAsArray(technologies),
    });
  });
};

exports.findConnections = (coordinates, technologies) => connections.filter((conection) => {
  const isNear = calculateDistance(coordinates, conection.coordinates) < 10;
  const hasTechnologies = conection.technologies.some((item) => technologies.includes(item));
  return isNear && hasTechnologies;
});

exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};

exports.sendMessageToAll = (message, data) => {
  this.sendMessage(connections, message, data);
};

exports.sendNewDevMessage = (data) => {
  const { technologies, location: { coordinates: [longitude, latitude] } } = data;
  // console.log(data);
  // console.log(connections);
  const to = this.findConnections({ latitude, longitude }, technologies);
  this.sendMessage(to, 'new-dev', data);
};
