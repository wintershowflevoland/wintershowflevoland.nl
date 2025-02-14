import Link from "next/link";
import { NavBarComp } from "./navBarComp";
import { Card } from "./ui/card";

export default function TopBannerComp() {
	return (
		<div className="z-50 relative" id="topbanner">
			<img
				src="/assets/site/header-picture.jpg"
				className="block object-cover w-full h-[35vh] md:h-[40vh] grayscale z-0"
				alt=""
			/>
			<div className="absolute top-0 w-full z-10">
				<div className="flex items-center p-4 w-fit mx-auto text-secondary mt-2 md:mt-10">
					<Link href="/">
						<img
							src="/assets/site/logo-icon-transparant.png"
							alt="logo"
							className="h-[60px] w-[60px] md:h-[90px] md:w-[90px]"
						/>
					</Link>
					<Link
						href="/"
						className="hover:underline grow text-4xl md:text-5xl font-bold flex"
					>
						<h1>Wintershow Flevoland</h1>
					</Link>
				</div>
			</div>
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
							18:00 uur.
						</h1>
						<p className="text-sm">
							De voorbereidingen voor de Wintershow Dronten zijn al in volle
							gang! Daarmee is de datum voor aankomend jaar bekend en kan je je
							daar voor aanmelden.
						</p>
						{/* <br />
						<AanmeldButton /> */}
					</div>
				</Card>
				<NavBarComp small={true} />
			</div>
		</div>
	);
}
