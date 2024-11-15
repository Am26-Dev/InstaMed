import { Server } from "socket.io";

let connections = {};
let timeOnLine = {};

export const connectToSocket = (server) => {
  //here the cors setup only for the devlopment and not to be used for production
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  //When a client connects to the server, the io.on("connection", ...) event handler is triggered.

  io.on("connection", (socket) => {
    console.log("Something connected");

    socket.on("join-call", (path) => {
      //after this handler is initialize it initializes an empty array connections[path] to store connected socket IDs

      if (connections[path] === undefined) {
        connections[path] = [];
      }

      //adding the current socket ID to the array connections[path]
      connections[path].push(socket.id);

      timeOnLine[socket.id] = new Date();

      // connections[path].forEach(element => {
      //     io.to(element)
      // });

      // #The event includes the following parameters:
      // 1."user-joined": The event name.
      // 2.socket.io: The sender’s socket ID (which is the current socket).
      // 3.connections[path]: The entire array of socket IDs for this specific path.

      // In summary, this loop broadcasts a “user-joined” event to all connected clients, notifying them that a new user has joined. Each client receives this event with the sender’s socket ID and the complete list of connected socket IDs for that specific path.
      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });


    socket.on("disconnect", () => {
      var diffTime = Math.abs(timeOnLine[socket.id] - new Date());

      var key;

      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;

            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }

            var index = connections[key].indexOf(socket.id);

            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
};

//Finally, the function returns the io instance, which represents the Socket.IO server.
