import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { signOut } from "../store/user.action";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userService } from "../services/user.service";

export function UserModal({ toggleModal, currState }) {
	const [loggUser, setLoggUser] = useState(userService.getLoggedinUser());
	const user = useSelector((state) => state.userModule);
	const history = useHistory();

	const isActive = useSelector((state) => state.headerModule.headerMode.isActive)

	function toggle(ev) {
		console.log(ev.target);
		ev.stopPropagation();
		toggleModal(!currState);
	}

	// useEffect(()=>{
	// 	console.log(isActive)
	// },[isActive])

	useEffect(() => {
		window.addEventListener("click", toggle);
		return () => {
			window.removeEventListener("click", toggle);
		};
	}, []);
	function onLogOut() {
		userService.logout();
		console.log("logout");
	}

	return (
		<nav className={`user-modal-container ${isActive && "active-modal"} ${currState && "open"}`}>
			<ul>
				<li>
					{loggUser ? (
						<Link to={"/"}>
							<span className='user-modal-span'>Statistics & Dashboard</span>
						</Link>
					) : (
						<Link to={"/user/signup"}>
							<span className='user-modal-span'>Sign up</span>
						</Link>
					)}
				</li>
				<li>
					{loggUser ? (
						<span className='user-modal-span'>About</span>
					) : (
						<Link to={"/user/login"}>
							<span className='user-modal-span'>Log in</span>
						</Link>
					)}
				</li>
				<hr />
				<li>
					<span className='user-modal-span'>Start hosting</span>
				</li>
				<li onClick={onLogOut}>{loggUser ? <span className='user-modal-span'>Log out</span> : <span className='user-modal-span'>About</span>}</li>
				<li>
					<span className='user-modal-span'>Help</span>
				</li>
			</ul>
		</nav>
	);
}
