"use client";
import { useEvent } from "@/context/EventContext";
import { Children, ReactNode, useEffect, useState } from "react";
import BottomFotoRapperComp from "./BottomFotoRapperComp";

interface PageScrollCompProps {
	children: ReactNode; // Accepts children as a prop
}

export default function PageScrollComp({ children }: PageScrollCompProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { eventState } = useEvent();
	const [showBottomImages, setShowBottomImages] = useState(false);

	useEffect(() => {
		if (eventState === "AanmeldDialog") {
			setDialogOpen(true);
		}
		if (eventState === "AanmeldDialogClosed") {
			setDialogOpen(false);
		}
	}, [eventState]);

	// Define an array with the section IDs
	const sectionIds = ["topbanner"];

	// Dynamically add section IDs based on the children
	Children.map(children, (_, index) => {
		sectionIds.push(`section-${index + 1}`);
	});

	sectionIds.push("footer");

	// Function to handle scroll behavior
	useEffect(() => {
		if (dialogOpen) return; // Skip custom scrolling when dialog is open

		const sections = sectionIds.map((id) => document.getElementById(id));

		let lastScrollTime = 0; // To track the last time scroll happened
		let isScrolling = false; // To prevent multiple scrolls from being triggered too quickly

		// Variables for touch events
		let touchStartY = 0;
		let touchEndY = 0;

		// Helper to check if the target is a scrollable container
		const isScrollableContainer = (target: HTMLElement | null): boolean => {
			while (target) {
				// Check if the element itself is scrollable
				if (
					target.classList.contains("overflow-y-scroll") ||
					target.classList.contains("overflow-scroll")
				) {
					return true;
				}

				// Fallback: Check computed styles
				const style = window.getComputedStyle(target);
				if (
					style.overflow === "auto" ||
					style.overflow === "scroll" ||
					style.overflowY === "auto" ||
					style.overflowY === "scroll"
				) {
					return true;
				}

				// Traverse up the DOM tree
				target = target.parentElement;
			}
			return false;
		};

		// Common scroll logic for both desktop and mobile
		const handleScroll = (isScrollingDown: boolean) => {
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

			if (currentSectionIndex === 2 || currentSectionIndex === 3) {
				console.log("index 2");
				setShowBottomImages(true);
			} else {
				console.log("index not 2");
				if (showBottomImages) {
					setShowBottomImages(false);
				}
			}

			// Check if we are in a scrollable area
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

		// Handle desktop wheel scrolling
		const handleWheel = (event: WheelEvent) => {
			const target = event.target as HTMLElement;

			// Skip custom scrolling if the target is a scrollable container
			if (isScrollableContainer(target)) return;

			event.preventDefault();
			handleScroll(event.deltaY > 0);
		};

		// Handle mobile touch scrolling
		const handleTouchStart = (event: TouchEvent) => {
			const target = event.target as HTMLElement;

			// Skip custom scrolling if the target is a scrollable container
			if (isScrollableContainer(target)) return;

			touchStartY = event.touches[0].clientY;
		};

		const handleTouchMove = (event: TouchEvent) => {
			const target = event.target as HTMLElement;

			// Skip custom scrolling if the target is a scrollable container
			if (isScrollableContainer(target)) return;

			event.preventDefault();
			touchEndY = event.touches[0].clientY;

			// Calculate scroll direction
			const isScrollingDown = touchStartY > touchEndY;
			handleScroll(isScrollingDown);
		};

		// Add event listeners for both desktop and mobile
		window.addEventListener("wheel", handleWheel, { passive: false });
		window.addEventListener("touchstart", handleTouchStart, { passive: false });
		window.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			// Clean up event listeners
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [sectionIds, dialogOpen]);

	return (
		<div className="flex flex-col items-center">
			{Children.map(children, (child, index) => (
				<section
					key={index} // Add a key for each child to ensure stable rendering
					id={`section-${index + 1}`} // Dynamically assign section IDs
					className="w-full h-screen flex justify-center items-center"
				>
					{child}
				</section>
			))}
			<BottomFotoRapperComp hidden={showBottomImages} />
		</div>
	);
}
