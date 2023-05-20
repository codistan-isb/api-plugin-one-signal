// import io from 'socket.io-client';
var { IS_PRODUCTION } = process.env
import { ObjectId } from 'mongodb';
// import { find } from '../models/User.js';
async function sendNotficationToSocket(userId, notificationId, notifierId) {
    console.log("userId, notificationId, notifierId ", userId, notificationId, notifierId);
    notifierId = notifierId.toString();
    userId = userId.toString();
    notificationId = notificationId.toString();
    console.log("notifierId ", notifierId);
    var socketUrl;
    if (IS_PRODUCTION) {
        socketUrl = 'wss://new.unitedmarket.com/'
    } else {
        socketUrl = 'wss://dev.unitedmarket.com/'
    }
    // const socket = io(socketUrl, {
    //     path: '/chatt',
    //     query: {
    //         userId: userId
    //     }
    // });

    // Your backend service code here...

    // When you want to send an event, use the `emit` method
    // socket.emit('sendLiveNotifcation', {
    //     "notificationId": notificationId,
    //     "notifierId": notifierId
    // });
}
async function sendNotficationToAll(userId, notificationId, notifierId) {
    console.log("notification to all")
    console.log("userId, notificationId, notifierId ", userId, notificationId, notifierId)
    userId = userId.toString()
    notificationId = notificationId.toString()
    console.log("notifierId ", notifierId);
    var socketUrl;
    if (IS_PRODUCTION) {
        socketUrl = 'wss://new.unitedmarket.com/'
    } else {
        socketUrl = 'wss://dev.unitedmarket.com/'
    }
    const filter = { roleId: ObjectId("63244b139c4a234c0e3ad728") };
    //Finding all users based on search query 
    // var searchedUsers = await find(filter).populate('')
    // console.log("searchedUsers ", searchedUsers)
    // const socket = io(socketUrl, {
    //     path: '/chatt',
    //     query: {
    //         userId: userId
    //     }
    // });
    // searchedUsers.forEach(user => {
    //     // Your backend service code here...
    //     // When you want to send an event, use the `emit` method
    //     console.log("user._id ", user._id)
    //     var notifierId2 = user._id.toString()
    //     console.log("notifierId2 ", notifierId2)
    //     socket.emit('sendLiveNotifcation', {
    //         "notificationId": notificationId,
    //         "notifierId": notifierId2
    //     });
    // })

}
export default {
    sendNotficationToSocket, sendNotficationToAll
}