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
				<Link href="/#over-ons" className="hover:underline">
					OverOns
				</Link>
				<Link href="/#sponsoren" className="hover:underline">
					Sponsoren
				</Link>
				<Link href="/#fotos" className="hover:underline">
					Foto&apos;s
				</Link>
				<AanmeldButton />
			</div>
		);
	};

	return (
		<nav className="fixed w-full bg-card dark:bg-background px-16 md:px-24 py-2 rounded-b-lg font-medium z-50 ">
			<div className="flex gap-2 md:gap-4 items-center">
				<Link href="/">
					<img
						src="/assets/site/logo-icon-transparant.png"
						alt="logo"
						className="h-[36px] w-[36px]"
					/>
				</Link>
				<Link href="/" className="hover:underline grow text-lg font-bold flex">
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
		</nav>
	);
}
