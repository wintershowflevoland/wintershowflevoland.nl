import { getAllSponsors } from "@/lib/api";
import Link from "next/link";
import SponsorCard from "./sponsorCard";
import { Card } from "./ui/card";

export default function SponsorsComp() {
	const allSponsors = getAllSponsors();
	return (
		<div>
			<h2 className="text-2xl font-bold pb-2" id="sponsoren">
				Sponsoren:
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
				{allSponsors.map((sponsor) => (
					<SponsorCard
						key={sponsor.slug}
						img={sponsor.logo}
						title={sponsor.name}
						url={sponsor.siteUrl}
					/>
				))}
				<Card
					className="bg-card p-4 hover:underline hover:cursor-pointer flex"
					// onClick={() => window.open("/sponsering", "_blank")}
				>
					<div className="m-auto">
						<Link href="/sponsoring">
							<h2 className="pt-2 text-center text-lg font-bold">
								Word vrienden van de show!
							</h2>
						</Link>
					</div>
				</Card>
			</div>
		</div>
	);
}
