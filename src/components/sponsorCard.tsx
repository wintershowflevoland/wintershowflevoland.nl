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
			className="bg-card p-4 hover:underline hover:cursor-pointer"
			onClick={() => window.open(url, "_blank")}
		>
			<img src={img} className=" rounded-full" alt="" />
			<h2 className="pt-2 text-center text-lg font-bold">{title}</h2>
		</Card>
	);
};

export default SponsorCard;
