const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors())

connectDB();     

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1> Chat App </h1>");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}..`);
});

const io = new require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost/3000'
  }
})

io.on('connection', (socket) => {
  console.log('################################ connection to scoket.io ##################################');

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  })
})

