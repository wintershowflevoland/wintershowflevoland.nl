"use client";
import { Card } from "./ui/card";

const SponsorCard = ({
	img,
	title,
	url,
}: {
	img: string;
	title: string;
	url: string;
}) => {
	return (
		<Card
			className="bg-card p-4 hover:underline hover:cursor-pointer flex"
			onClick={() => window.open(url, "_blank")}
		>
			<div className="m-auto">
				<img src={img} className=" rounded-full" alt={title} />
				<h2 hidden className="pt-2 text-center text-lg font-bold">
					{title}
				</h2>
			</div>
		</Card>
	);
};

export default SponsorCard;
