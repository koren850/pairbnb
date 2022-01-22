import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { signOut } from "../store/user.action";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function UserModal({ openModal }) {
	const [loggUser, setLoggUser] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userModule);
	const history = useHistory();

	function onLogOut() {
		console.log(user);
	}

	return (
		<nav className={`user-modal-container ${openModal && "open"}`}>
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
				<li>
					{loggUser ? (
						<button onClick={onLogOut} className='log-out-btn'>
							<span className='user-modal-span'>Log out</span>
						</button>
					) : (
						<span className='user-modal-span'>About</span>
					)}
				</li>
				<li>
					<span className='user-modal-span'>Help</span>
				</li>
			</ul>
		</nav>
	);
}
