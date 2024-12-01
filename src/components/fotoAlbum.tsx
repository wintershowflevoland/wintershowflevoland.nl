"use client";
import { Card } from "./ui/card";

const FotoAlbum = ({
	albumTitle,
	albumUrl,
}: {
	albumTitle: string;
	albumUrl: string;
}) => {
	return (
		<Card
			className="bg-card p-4 hover:underline hover:cursor-pointer"
			onClick={() => window.open(albumUrl, "_blank")}
		>
			<h2 className="pt-2 text-center text-lg font-bold">{albumTitle}</h2>
		</Card>
	);
};

export default FotoAlbum;
