"use client";
import { useEffect, useRef, useState } from "react";

export default function BottomFotoRapperComp() {
	const imgRef = useRef<HTMLImageElement | null>(null); // Create a ref for the target element
	const [heightOffset, setHeightOffset] = useState(0);
	const [newsHeight, setNewsHeight] = useState(0);
	const [imgHeight, setImgHeight] = useState(0);
	useEffect(() => {
		const targetElement = document.getElementById("nieuws-home");
		const imgTargetElement = imgRef.current;

		if (targetElement) {
			// Set initial height
			setNewsHeight(targetElement.clientHeight);
			if (imgTargetElement) {
				setImgHeight(imgTargetElement.clientHeight);
				setHeightOffset(-(imgTargetElement.clientHeight / 2));
			}

			// Create a ResizeObserver
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					// Update height when the size changes

					setNewsHeight(entry.contentRect.height);
					console.log("Height changed:", entry.contentRect.height);
					if (imgTargetElement) {
						setImgHeight(imgTargetElement.clientHeight);
						setHeightOffset(-(imgTargetElement.clientHeight / 2));
						console.log(
							"Height changed img:",
							-(imgTargetElement.clientHeight / 2)
						);
					}
				}
			});

			// Observe the target element
			resizeObserver.observe(targetElement);

			// Cleanup the observer on unmount
			return () => resizeObserver.disconnect();
		}
	}, []); // Empty dependency array ensures this runs once on mount
	return (
		<>
			<div
				style={{
					paddingBottom: `${imgHeight}px`,
				}}
			/>
			<div className={"-z-10 overflow-hidden hidden lg:block"}>
				<img
					ref={imgRef}
					className="w-[25vw] absolute left-[-50px] rounded-md -z-10 grayscale"
					style={{ bottom: "-" + (newsHeight + heightOffset) + "px" }}
					src="/assets/site/foto-bottom-left.jpg"
					alt=""
				/>
				<img
					style={{ bottom: "-" + (newsHeight + heightOffset) + "px" }}
					className="w-[25vw] absolute right-[-50px] rounded-md transform -scale-x-100 -z-10 grayscale"
					src="/assets/site/foto-bottom-right.jpg"
					alt=""
				/>
			</div>
		</>
	);
}
