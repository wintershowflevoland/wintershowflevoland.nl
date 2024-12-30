import { getAllSponsors } from "@/lib/api";
import SponsorCard from "./sponsorCard";

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
				{/* <SponsorCard
					img={"/assets/site/logo-icon.jpeg"}
					title={"Static  Sponor"}
					url={"https://google.com"}
				/> */}
			</div>
		</div>
	);
}
