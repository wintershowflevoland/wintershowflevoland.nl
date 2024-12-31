"use client";
import { useEffect, useState } from "react";

export default function BottomFotoRapperComp() {
	const heightOffset = -230;
	const [newsHeight, setNewsHeight] = useState(0);
	useEffect(() => {
		if (newsHeight === 0) {
			setNewsHeight(
				window.document.getElementById("nieuws-home")?.clientHeight || 0
			);
		}
		const handleResize = () => {
			console.log("resize");
			console.log(window.document.getElementById("nieuws-home")?.clientHeight);
			setNewsHeight(
				window.document.getElementById("nieuws-home")?.clientHeight || 0
			);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<div className={"-z-10 overflow-hidden hidden lg:block"}>
			<img
				className="w-[25vw] absolute left-[-50px] rounded-md -z-10"
				style={{ bottom: "-" + (newsHeight + heightOffset) + "px" }}
				src="/assets/site/foto-bottom-left.jpg"
				alt=""
			/>
			<img
				style={{ bottom: "-" + (newsHeight + heightOffset) + "px" }}
				className="w-[25vw] absolute right-[-50px] rounded-md transform -scale-x-100 -z-10"
				src="/assets/site/foto-bottom-right.jpg"
				alt=""
			/>
		</div>
	);
}
