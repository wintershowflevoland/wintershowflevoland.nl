"use client"; // Add this line
import { useEvent } from "@/context/EventContext";
import Link from "next/link";

export function FooterComp() {
	const { triggerEvent } = useEvent();

	const handelAanmelden = (): void => {
		triggerEvent("AanmeldDialog");
	};

	return (
		<footer className="grid grid-cols-1 gap-4 px-8 py-4 mt-24">
			<div className="w-full grid gap-2 grid-cols-1 md:grid-cols-3">
				<div>
					<p className=" font-semibold">Contact:</p>
					<p>Wintershow Flevoland</p>
					<p> Email: info@wintershowflevoland.nl </p>
				</div>
				<div>
					<p className=" font-semibold">Locatie:</p>
					<p>Hippisch Centrum Flevodrome</p>
					<br />
					<p>Wisentweg 9a</p>
					<p>8251 PB Dronten</p>
					<p>Nederland</p>
				</div>
				<div>
					<p className=" font-semibold">Links:</p>
					<p
						className="hover:underline hover:cursor-pointer"
						onClick={handelAanmelden}
					>
						Aanmelden
					</p>

					<Link
						href="https://www.facebook.com/profile.php?id=100078153516204"
						className="hover:underline"
					>
						FaceBook
					</Link>
					<Link
						href="https://instagram.com/wintershowflevoland/"
						className="hover:underline"
					>
						Instagram
					</Link>
				</div>
			</div>
			<div className="sm:flex">
				<div>© {new Date().getFullYear()} Wintershow Flevoland</div>
				{/* <div className="grow" />
				<div>KVK : 00000000 | IBAN: 0ss0s0s0s0000s</div> */}
			</div>
		</footer>
	);
}
