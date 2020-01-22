import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.76:3333', {
  autoConnect: false,
});

function connect(latitude, longitude, technologies) {
  socket.io.opts.query = {
    latitude,
    longitude,
    technologies,
  };

  socket.connect();

  socket.on('message', (text) => alert(text));
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
};
