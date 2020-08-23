const express = require("express");
const app = express();
const http = require("http")
const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)

const ObjectSocketIo = require("./helper/SendObject")

const admin = "Admin"

io.on("connection", (socket)=>{
    console.log("connectting......");
    socket.emit("frist","Wellcome to room")

    socket.broadcast.emit("mes",ObjectSocketIo(admin, "A user join room") )

    socket.on('disconnect',()=>console.log("disconnect..."))
})

const PORT = 4000

app.use("/", function(req, res){
    res.send("OK nha")
})

server.listen(PORT, ()=>{console.log(`Server running on ${PORT}`);})