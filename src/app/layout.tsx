import { AanmeldDialog } from "@/components/aanmeldDialog";
import { FooterComp } from "@/components/footerComp";
import { NavBarComp } from "@/components/navBarComp";
import TopBannerComp from "@/components/topbannerComp";
import { EventProvider } from "@/context/EventContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Wintershow Flevoland ",
	description: "Provinciale Wintershow Flevoland keuring 2025 33e editie!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<EventProvider>
					{/* {children} */}
					<div className=" flex flex-col w-full h-[100dvh]">
						<div className="fixed w-full z-40">
							<NavBarComp />
						</div>
						<main className="flex-grow">
							<TopBannerComp />
							<div className="w-[90vw] lg:w-[70vw] mx-auto grid grid-flow-row gap-8">
								{children}
							</div>
							<AanmeldDialog />
						</main>
						<FooterComp />
					</div>
				</EventProvider>
			</body>
		</html>
	);
}
