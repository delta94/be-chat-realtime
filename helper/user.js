
const userInRoom = [];

// add user in room
const addUser = (id, name, room)=>{
    const nameTrim = name.trim().toLowerCase();
    const roomTrim= room.trim().toLowerCase();

    const userExisted = userInRoom.find(user=> roomTrim ===user.name && nameTrim === user.name)
    if(userExisted){
        return {error:"User is existed"}
    }
    const user = {id, nameTrim, roomTrim}
    userInRoom.push(user)
    return {user}
}
// remove user
const removeUser = (id)=>{
    const index = userInRoom.findIndex(u => u.id === id)
    if(index !== -1){
        const removeUserFromRoom = userInRoom.splice(index, 1)[0]
        return removeUserFromRoom
    } else{return {err:"User is not existed"}}
  
  
}
// get user in room
const getUserInRoom = (id)=>{
    const user = userInRoom.find(u => u.id === id)
    if(!user){
        return {err:"Not found user. Please login again"}
    }
    return {user}
}
// get all user in room 
const getAllUsersInRoom = (room)=>{
    const roomNow= room.trim().toLowerCase();
    const allUser = userInRoom.filter(u=>u.roomTrim === roomNow);
    return allUser
}
module.exports = {addUser, removeUser, getUserInRoom, getAllUsersInRoom}
