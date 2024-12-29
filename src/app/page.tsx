import AboutusComp from "@/components/aboutusComp";
import NieuwsComp from "@/components/nieuwsComp";
import PageScrollComp from "@/components/pageScrollComp";
import SponsorsComp from "@/components/sponsorsComp";
/* eslint-disable @next/next/no-img-element */

export default function Home() {
	return (
		<PageScrollComp>
			{/* Nieuws */}
			<NieuwsComp />
			{/* About us */}
			<AboutusComp />
			{/* Sponsors */}
			<SponsorsComp />
			{/* Fotos
			<FotosComp /> */}
		</PageScrollComp>
	);
}

// export default function Page() {
// 	// Define an array with the section IDs
// 	const sectionIds = [
// 		"topbanner",
// 		"section1",
// 		"section2",
// 		"section3",
// 		"footer",
// 	];

// 	// Function to handle scroll behavior
// 	useEffect(() => {
// 		const sections = sectionIds.map((id) => document.getElementById(id));

// 		let lastScrollTime = 0; // To track the last time scroll happened
// 		let isScrolling = false; // To prevent multiple scrolls from being triggered too quickly

// 		const handleScroll = (event: WheelEvent) => {
// 			event.preventDefault();

// 			const currentTime = new Date().getTime();

// 			// If too much time has passed since last scroll, reset scrolling behavior
// 			if (currentTime - lastScrollTime < 666 || isScrolling) return;

// 			lastScrollTime = currentTime;

// 			// Find the current section based on the section's center being in the viewport
// 			const currentSectionIndex = sections.findIndex((section) => {
// 				if (!section) return false;
// 				const rect = section.getBoundingClientRect();
// 				// Check if the center of the section is in the viewport
// 				return (
// 					rect.top + rect.height / 2 >= 0 &&
// 					rect.top + rect.height / 2 <= window.innerHeight
// 				);
// 			});

// 			console.log("scrolling to " + currentSectionIndex);

// 			// Calculate the scroll direction (down or up)
// 			const isScrollingDown = event.deltaY > 0;

// 			// Check if we are in a scrollable area (threshold to avoid skipping too many sections)
// 			const shouldScroll =
// 				(isScrollingDown && currentSectionIndex < sections.length - 1) ||
// 				(!isScrollingDown && currentSectionIndex > 0);

// 			if (shouldScroll) {
// 				// Scroll down: go to the next section or scroll up: go to the previous section
// 				const nextSection = isScrollingDown
// 					? sections[currentSectionIndex + 1]
// 					: sections[currentSectionIndex - 1];

// 				if (nextSection) {
// 					// Lock scroll while transitioning
// 					isScrolling = true;
// 					nextSection.scrollIntoView({
// 						behavior: "smooth",
// 						block: "start",
// 					});

// 					// Release scroll lock after scroll transition
// 					setTimeout(() => {
// 						isScrolling = false;
// 					}, 800); // Adjust the timeout based on scroll transition duration
// 				}
// 			}
// 		};

// 		// Add the event listener with passive: false
// 		window.addEventListener("wheel", handleScroll, { passive: false });

// 		return () => {
// 			window.removeEventListener("wheel", handleScroll);
// 		};
// 	}, [sectionIds]);

// 	return (
// 		<div className="flex flex-col items-center">
// 			<section
// 				id="section1"
// 				className="w-full h-screen bg-blue-300 flex justify-center items-center text-white text-3xl"
// 			>
// 				<NieuwsComp />
// 			</section>
// 			<section
// 				id="section2"
// 				className="w-full h-screen bg-green-300 flex justify-center items-center text-white text-3xl"
// 			>
// 				<AboutusComp />
// 			</section>
// 			<section
// 				id="section3"
// 				className="w-full h-screen bg-red-300 flex justify-center items-center text-white text-3xl"
// 			>
// 				<SponsorsComp />
// 			</section>
// 		</div>
// 	);
// }
