const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];
let loginUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("login-user-add",(newUserId)=>{

    if (!loginUsers.some((user) => user.userId === newUserId)) {
      loginUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New Person Logged In", loginUsers);
    }
    io.emit("logged-users", loginUsers);
  })

  socket.on("get-users-count",()=>{
    const count = loginUsers.length
    console.log("count:",count)
    io.emit("users-Count",count)
  })

  socket.on("disconnect", () => {
  
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    loginUsers = loginUsers.filter((user)=>user.socketId !== socket.id)
    console.log("User Disconnected", activeUsers);
    console.log("User Disconnected", loginUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
    io.emit("logged-users", loginUsers);
    const count = loginUsers.length
    io.emit("users-Count",count)
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});