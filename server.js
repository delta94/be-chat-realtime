const express = require("express");
const app = express();
const http = require("http")
const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)
const moment = require("moment")

const {addUser, removeUser, getUserInRoom, getAllUsersInRoom} = require("./helper/user")

const admin = {nameTrim:"Admin"}

io.on("connection", (socket)=>{
    const time = moment().format('hh:mm a');
    console.log("connectting......");
    socket.on("join",({name, room}, callback)=>{
       const {user, error} = addUser(socket.id, name, room);
       if(error){
        callback(error)
       }else{
        socket.join(user.roomTrim).emit("mes",{user:admin, text:"Wellcome to room",time })
        socket.broadcast.to(user.roomTrim).emit("mes", {user:admin, text:`${user.nameTrim} join room ${user.roomTrim}`,time})
        io.to(user.roomTrim).emit("dataRoom", getAllUsersInRoom(user.roomTrim))
       }
    })
    socket.on("sendMess", (mes, callback)=>{
        const {user,err} = getUserInRoom(socket.id)
        if(err){
            callback(err)
        }else{
            io.to(user.roomTrim).emit("mes",  {user, text: mes,time});
        }
        
    })
    socket.on('disconnect',()=>{
        const {user} = removeUser(socket.id);
        if(user){
            io.to(user.roomTrim).emit("mes",  {user:admin, text: `User ${user.nameTrim} leave room`});
            io.to(user.roomTrim).emit("dataRoom", getAllUsersInRoom(user.roomTrim))
        }
        
    })
})

const PORT = 4000

app.use("/", function(req, res){
    res.send("Server is running....")
})

server.listen(PORT, ()=>{console.log(`Server running on ${PORT}`);})