import AanmeldButton from "./aanmeldButton";
import { NavBarComp } from "./navBarComp";
import { Card } from "./ui/card";

export default function TopBannerComp() {
	return (
		<div className="z-50 relative" id="topbanner">
			<img
				src="/assets/site/header-picture.jpg"
				className="block object-cover w-full h-[25vh] md:h-[40vh] grayscale z-0"
				alt=""
			/>
			<div className="-translate-y-1/2">
				<Card className="w-[90vw] lg:w-[70vw] h-fit md:h-[30vh] lg:h-[25vh] mx-auto overflow-hidden bg-transparent border-transparent grid sm:grid-cols-2 ">
					<div className="h-full w-full hidden sm:block">
						<img
							src="/assets/site/header-card-picture.jpg"
							className="md:w-[70vw] h-ful md:h-[30vh] lg:h-[25vh] block object-cover w-full"
							alt=""
						/>
					</div>
					<div className="bg-card p-4">
						<h1 className="text-lg sm:text-2xl font-bold">
							Wintershow Flevoland <br /> Dinsdagavond 4 maart <br /> Aanvang
							18:30 uur.
						</h1>
						<p className="text-sm">
							De voorbereidingen voor de Wintershow Dronten zijn al in volle
							gang! Daarmee is de datum voor aankomend jaar bekend en kan je je
							daar voor aanmelden.
						</p>
						<br />
						<AanmeldButton />
					</div>
				</Card>
				<NavBarComp />
			</div>
		</div>
	);
}
