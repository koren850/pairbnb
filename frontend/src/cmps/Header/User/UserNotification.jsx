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

	useEffect(() => {
		socketService.setup();
		const loggedUser = userService.getLoggedinUser();
		if (loggedUser) socketService.emit("join-room", loggedUser._id);
		socketService.on("recive-new-order", handleNewNotification);
		socketService.on("response-to-guest", handleNewNotification);
		return () => {
			socketService.off("recive-new-order", handleNewNotification);
			socketService.off("response-to-guest", handleNewNotification);
		};
	}, []);
	async function handleNewNotification(response) {
		const currUser = await userService.getById(response.id);
		if (response.action === "unshift") currUser.notifications.unshift(response.action);
		const updatedUser = await userService.update(currUser);
		userService.setLoggedinUser(updatedUser);
		disptach(updateUserNotifications(updatedUser.notifications));
		disptach(openMsg({ txt: response.msg, type: "bnb" }));
	}

	return notificationsAmount ? <div className='user-notifications-dot'>{notificationsAmount}</div> : <React.Fragment></React.Fragment>;
}
