import React from "react";
import styles from "./MainPage.module.css";
function MainPage({setIsVisible, isVisible}) {
	return (
		<div
			style={
				isVisible ? {background: "blur(10px)", position: "relative", zIndex: 1} : {filter: "none"}
			}
		>
			<nav style={{position: "relative", zIndex: 66}}>
				&nbsp;&lt;&nbsp;<h3>View Audience</h3>
			</nav>

			<main>
				<button className={styles.toggle_btn} onClick={() => setIsVisible(!isVisible)}>
					Save Segment
				</button>
			</main>
		</div>
	);
}

export default MainPage;
