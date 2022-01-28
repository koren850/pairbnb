
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/user.service";
import { socketService } from "../../../services/socket.service";
import { updateUserNotifications } from "../../../store/user.action"

export function UserNotification() {
    const disptach = useDispatch()
    const user = useSelector(state => state.userModule.user)
    const notificationsAmount = user.notifications?.length;
    
 const handleNewNotification = async (id) => {
     console.log(0)
        const currUser = await userService.getById(id);
        const updatedNotifications = currUser.notifications;
        updatedNotifications.push('You got new notification');
        const updatedUser = {...currUser, notifications:updatedNotifications};
        console.log(1)
        await userService.update(updatedUser);
        console.log(2)
        userService.setLoggedinUser(updatedUser);
        disptach(updateUserNotifications(updatedNotifications))
    }
    
    useEffect(() => {
        console.log(user.notifications)
		socketService.setup();
        socketService.on('recive-new-order', handleNewNotification);
        return () => {
            // socketService.off('recive-new-order')
        }
    }, [])

    return (
        notificationsAmount ? <div className="user-notifications-dot">{notificationsAmount}</div> : <React.Fragment></React.Fragment>
    )
}