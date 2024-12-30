/* eslint-disable @next/next/no-img-element */
"use client"; // Add this line
import Link from "next/link";
import { useEffect } from "react";
import AanmeldButton from "./aanmeldButton";
import { AanmeldDialog } from "./aanmeldDialog";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./ui/navigation-menu";

export function NavBarComp() {
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
				<Link href="/#section-2" className="hover:underline">
					OverOns
				</Link>
				<Link href="/#section-3" className="hover:underline">
					Sponsoren
				</Link>
				<Link href="/#section-4" className="hover:underline">
					Foto&apos;s
				</Link>
				<AanmeldButton />
			</div>
		);
	};

	return (
		<nav className="w-full bg-card dark:bg-background py-2 rounded-b-lg font-medium">
			<div className="w-[90vw] lg:w-[70vw] m-auto px-1">
				<div className="flex gap-2 md:gap-4 items-center">
					<Link href="/">
						<img
							src="/assets/site/logo-icon-transparant.png"
							alt="logo"
							className="h-[36px] w-[36px]"
						/>
					</Link>
					<Link
						href="/"
						className="hover:underline grow text-lg font-bold flex"
					>
						<h1 className="">Wintershow Flevoland</h1>
					</Link>
					<LinksList className="hidden md:flex" />
					<NavigationMenu className="block md:hidden">
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
				<AanmeldDialog />
			</div>
		</nav>
	);
}
