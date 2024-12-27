/* eslint-disable @next/next/no-img-element */
import AanmeldButton from "@/components/aanmeldButton";
import FotoAlbum from "@/components/fotoAlbum";
import SponsorCard from "@/components/sponsorCard";
import { Card } from "@/components/ui/card";
import { getAllFotoAlbums, getAllPosts, getAllSponsors } from "@/lib/api";
import { MoreStories } from "./_components/more-stories";

export default function Home() {
	const allPosts = getAllPosts();
	const allSponsors = getAllSponsors();
	const allFotoAlbums = getAllFotoAlbums();
	return (
		<div>
			{/* top of page */}
			<div>
				<img
					src="/assets/site/header-picture.jpg"
					className="block object-cover w-full h-[25vh] md:h-[40vh] grayscale z-0"
					alt=""
				/>
				<div className="-translate-y-1/2">
					<Card className="w-[90vw] lg:w-[70vw] h-fit md:h-[20vh] mx-auto overflow-hidden bg-transparent border-transparent grid sm:grid-cols-2 ">
						<div className="h-full w-full hidden sm:block">
							<img
								src="/assets/site/header-card-picture.jpg"
								className="md:w-[70vw] h-ful md:h-[20vh] block object-cover w-full"
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
								gang! Daarmee is de datum voor aankomend jaar bekend en kan je
								je daar voor aanmelden.
							</p>
							<br />
							<AanmeldButton />
						</div>
					</Card>
				</div>
			</div>
			{/* content */}
			<div className="w-[90vw] lg:w-[70vw] mx-auto grid grid-flow-row gap-8">
				{/* Fotos */}
				<div>
					<h2 className="text-2xl font-bold pb-2" id="fotos">
						Nieuws:
					</h2>
					{allPosts.length > 0 && <MoreStories posts={allPosts} />}
				</div>
				{/* About us */}
				<div>
					<h2 className="text-2xl font-bold pb-2" id="over-ons">
						Over Ons
					</h2>
					<div className="flex grid-cols-2 gap-4">
						<Card className="bg-card p-4 grow">
							<h2 className="text-lg font-bold">
								Wat is Wintershow Flevoland?
							</h2>
							<p className="text-sm">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Eligendi, unde perspiciatis tempore perferendis commodi repellat
								minima aspernatur modi cumque! Inventore nisi consectetur saepe
								quis doloremque. Excepturi magni possimus recusandae neque?
							</p>
						</Card>
						<div>
							<img
								src="/assets/site/logo.jpeg"
								className=" min-w-32  sm:min-w-44 lg:min-w-64 max-h-96 rounded-lg"
								alt=""
							/>
						</div>
					</div>
				</div>

				{/* Sponsors */}
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
						<SponsorCard
							img={"/assets/site/logo-icon.jpeg"}
							title={"Static  Sponor"}
							url={"https://google.com"}
						/>
					</div>
				</div>

				{/* Fotos */}
				<div>
					<h2 className="text-2xl font-bold pb-2" id="fotos">
						Fotos:
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
						{allFotoAlbums.map((album) => (
							<FotoAlbum
								key={album.slug}
								albumTitle={album.title}
								albumUrl={album.url}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

{
	/* <FacebookAlbumEmbed
					albumTitle={"test 1"}
					albumId={"a.149890187626098"}
				/> */
}
