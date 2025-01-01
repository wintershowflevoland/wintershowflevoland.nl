/* eslint-disable @next/next/no-img-element */
"use client"; // Add this line
import Link from "next/link";
import { useEffect } from "react";
import AanmeldButton from "./aanmeldButton";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./ui/navigation-menu";

export function NavBarComp({ small }: { small?: boolean }) {
	useEffect(() => {
		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		if (prefersDarkMode) {
			document.documentElement.classList.add("dark");
		}
	}, []);

	const LinksList = ({ className }: { className?: string }) => {
		return (
			<div className={"gap-2 md:gap-4 items-center " + className}>
				<Link href="/pinkenkeuring" className="hover:underline">
					Pinken keuring
				</Link>
				<Link href="/sponsoring" className="hover:underline">
					Sponsoring
				</Link>
				<Link href="/fotos" className="hover:underline">
					Foto&apos;s
				</Link>
				<Link href="/uitslag" className="hover:underline">
					Uitslag
				</Link>
				<AanmeldButton />
			</div>
		);
	};

	return (
		<nav className="w-full bg-card dark:bg-background py-2 rounded-b-lg font-medium">
			<div className="w-[90vw] lg:w-[70vw] m-auto px-1">
				<div
					className={
						"flex gap-2 md:gap-4 items-center" +
						" " +
						(small ? "w-fit mx-auto" : "")
					}
				>
					<Link href="/" hidden={small}>
						<img
							src="/assets/site/logo-icon-transparant.png"
							alt="logo"
							className="h-[36px] w-[36px]"
						/>
					</Link>
					<Link
						href="/"
						className={
							small ? "" : "hover:underline grow text-lg font-bold flex"
						}
						hidden={small}
					>
						<h1 className="">Wintershow Flevoland</h1>
					</Link>
					<LinksList className={small ? "flex" : "hidden md:flex"} />
					<NavigationMenu className={small ? "hidden" : "block md:hidden"}>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
								<NavigationMenuContent>
									<LinksList className="grid grid-flow-row p-4" />
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</nav>
	);
}
// Home(mobile), Pinkenheuring, Sponsoring, Fotos, Agenda, Utslag
