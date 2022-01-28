import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/user.service";
import { socketService } from "../../../services/socket.service";
import { updateUserNotifications } from "../../../store/user.action";
import { openMsg } from "../../../store/msg.action";

export function UserNotification() {
	const disptach = useDispatch();
	const user = useSelector((state) => state.userModule.user);
	const notificationsAmount = user.notifications?.length;

	const handleNewNotification = async (id) => {
		const currUser = await userService.getById(id);
		const updatedNotifications = currUser.notifications;
		updatedNotifications.push("You got new notification");
		const updatedUser = { ...currUser, notifications: updatedNotifications };
		await userService.update(updatedUser);
		userService.setLoggedinUser(updatedUser);
		disptach(updateUserNotifications(updatedNotifications));
        disptach(openMsg({type: 'SET_MSG', msg: { txt: 'You got new notification', type: 'bnb' } }))
	};

	async function handleOrderResponse(response) {
		console.log(response);
		const id = response.id;
		const currUser = await userService.getById(id);
		const updatedNotifications = currUser.notifications;
		updatedNotifications.push(response.status);
		const updatedUser = { ...currUser, notifications: updatedNotifications };
		await userService.update(updatedUser);
		userService.setLoggedinUser(updatedUser);
		disptach(updateUserNotifications(updatedNotifications));
        disptach(openMsg({type: 'SET_MSG', msg: { txt: 'You got new notification', type: 'bnb' } }))
	}
	async function removeNotification(id) {
		console.log("got here");
		const currUser = await userService.getById(id);
		const updatedNotifications = currUser.notifications;
		updatedNotifications.pop();
		const updatedUser = { ...currUser, notifications: updatedNotifications };
		await userService.update(updatedUser);
		userService.setLoggedinUser(updatedUser);
		disptach(updateUserNotifications(updatedNotifications));
	}

	useEffect(() => {
		console.log(user.notifications);
		socketService.setup();
		socketService.on("recive-new-order", handleNewNotification);
		socketService.on("order-response", handleOrderResponse);
		socketService.on("remove-notifications", removeNotification);
		return () => {
			// socketService.off('recive-new-order')
		};
	}, []);

	return notificationsAmount ? <div className='user-notifications-dot'>{notificationsAmount}</div> : <React.Fragment></React.Fragment>;
}
