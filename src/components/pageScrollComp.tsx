"use client";
import { Children, ReactNode, useEffect } from "react";

interface PageScrollCompProps {
	children: ReactNode; // Accepts children as a prop
}

export default function PageScrollComp({ children }: PageScrollCompProps) {
	// Define an array with the section IDs
	const sectionIds = ["topbanner"];

	// Dynamically add section IDs based on the children
	Children.map(children, (_, index) => {
		sectionIds.push(`section-${index + 1}`);
	});

	sectionIds.push("footer");

	// Function to handle scroll behavior
	useEffect(() => {
		const sections = sectionIds.map((id) => document.getElementById(id));

		let lastScrollTime = 0; // To track the last time scroll happened
		let isScrolling = false; // To prevent multiple scrolls from being triggered too quickly

		const handleScroll = (event: WheelEvent) => {
			event.preventDefault();

			const currentTime = new Date().getTime();

			// If too much time has passed since last scroll, reset scrolling behavior
			if (currentTime - lastScrollTime < 666 || isScrolling) return;

			lastScrollTime = currentTime;

			// Find the current section based on the section's center being in the viewport
			const currentSectionIndex = sections.findIndex((section) => {
				if (!section) return false;
				const rect = section.getBoundingClientRect();
				// Check if the center of the section is in the viewport
				return (
					rect.top + rect.height / 2 >= 0 &&
					rect.top + rect.height / 2 <= window.innerHeight
				);
			});

			console.log("scrolling to " + currentSectionIndex);

			// Calculate the scroll direction (down or up)
			const isScrollingDown = event.deltaY > 0;

			// Check if we are in a scrollable area (threshold to avoid skipping too many sections)
			const shouldScroll =
				(isScrollingDown && currentSectionIndex < sections.length - 1) ||
				(!isScrollingDown && currentSectionIndex > 0);

			if (shouldScroll) {
				// Scroll down: go to the next section or scroll up: go to the previous section
				const nextSection = isScrollingDown
					? sections[currentSectionIndex + 1]
					: sections[currentSectionIndex - 1];

				if (nextSection) {
					// Lock scroll while transitioning
					isScrolling = true;
					nextSection.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});

					// Release scroll lock after scroll transition
					setTimeout(() => {
						isScrolling = false;
					}, 800); // Adjust the timeout based on scroll transition duration
				}
			}
		};

		// Add the event listener with passive: false
		window.addEventListener("wheel", handleScroll, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [sectionIds]);

	return (
		<div className="flex flex-col items-center">
			{Children.map(children, (child, index) => (
				<section
					key={index} // Add a key for each child to ensure stable rendering
					id={`section-${index + 1}`} // Dynamically assign section IDs
					className="w-full h-screen bg-blue-300 flex justify-center items-center text-white text-3xl"
				>
					{child}
				</section>
			))}
		</div>
	);
}
