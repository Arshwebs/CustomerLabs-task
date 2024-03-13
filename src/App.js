import React, {useState} from "react";
import MainPage from "./page/MainPage";
import SavingSegment from "./component/SavingSegment";

function App() {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div>
			<MainPage isVisible={isVisible} setIsVisible={setIsVisible} />
			<SavingSegment isVisible={isVisible} setIsVisible={setIsVisible} />
		</div>
	);
}

export default App;
