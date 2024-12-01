"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useEvent } from "@/context/EventContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function AanmeldDialog() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const { eventState, triggerEvent } = useEvent();

	React.useEffect(() => {
		if (eventState) {
			if (eventState === "AanmeldDialog") {
				setOpen(true);
				triggerEvent("");
			}
		}
	}, [eventState]);

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				{/* <DialogTrigger asChild>
					<Button className="hover:underline">Aanmelden</Button>
				</DialogTrigger> */}
				<DialogContent className="sm:max-w-[625px]">
					<DialogHeader>
						<DialogTitle>Aanmelden</DialogTitle>
						{/* <DialogDescription>
							Make changes to your profile here. Click save when youre done.
						</DialogDescription> */}
					</DialogHeader>
					<AanmeldForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} closeThreshold={0.8}>
			{/* <DrawerTrigger asChild>
				<Button className="hover:underline">Aanmelden</Button>
			</DrawerTrigger> */}
			<DrawerContent className=" max-h-full">
				<DrawerHeader className="text-left">
					<DrawerTitle>Aanmelden</DrawerTitle>
				</DrawerHeader>
				<AanmeldForm className="px-4 overflow-x-scroll" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function AanmeldForm({ className }: React.ComponentProps<"form">) {
	// personal info
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [street, setStreet] = React.useState("");
	const [postal, setPostal] = React.useState("");
	const [ubn, setUbn] = React.useState("");
	const [ibr, setIbr] = React.useState("");
	const [bvd, setBvd] = React.useState("");
	const [paratbc, setParatbc] = React.useState("");
	const [group, setGroup] = React.useState("");
	// cow info
	const [personalInfoDone, setPersonalInfoDone] = React.useState(false);
	const [cowList, setCowList] = React.useState<
		{
			name: string;
			number: string;
			birth: string;
			calf: string;
			calved: string;
		}[]
	>([]);
	// list items cow
	const [cowName, setCowName] = React.useState("");
	const [cowBirth, setCowBirth] = React.useState("");
	const [cowNumber, setCowNumber] = React.useState("");
	const [calfDate, setCalfDate] = React.useState("");
	const [calvedCount, setCalvedCount] = React.useState("");
	const [cowInfoDone, setCowInfoDone] = React.useState(false);
	return (
		<form
			className={cn(
				"[&>div]:grid [&>div]:items-start [&>div]:gap-4",
				className
			)}
		>
			{!personalInfoDone ? (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Naam</Label>
						<Input
							type="text"
							id="name"
							placeholder="Voornaam Achternaam"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">E-Mailadres</Label>
						<Input
							type="email"
							id="email"
							placeholder="naam@me.mail"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="phone">Telefoon</Label>
						<Input
							type="phone"
							id="phone"
							placeholder="+31600000000"
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Straat + Huis Nummer</Label>
						<Input
							type="text"
							id="name"
							defaultValue=""
							onChange={(e) => setStreet(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Postcode + Woon Plaats</Label>
						<Input
							type="text"
							id="name"
							defaultValue=""
							onChange={(e) => setPostal(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="ubn">UBN nummer</Label>
						<Input
							type="text"
							id="ubn"
							defaultValue=""
							onChange={(e) => setUbn(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">IBR vrij</Label>
						<Select onValueChange={(e) => setIbr(e)}>
							<SelectTrigger>
								<SelectValue placeholder="Selecteer antwoord" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">BVD vrij</Label>
						<Select onValueChange={(e) => setBvd(e)}>
							<SelectTrigger>
								<SelectValue placeholder="Selecteer antwoord" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Paratbc Status</Label>
						<Select onValueChange={(e) => setParatbc(e)}>
							<SelectTrigger>
								<SelectValue placeholder="Selecteer antwoord" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="a">A</SelectItem>
								<SelectItem value="6t/m10">6 t/m 10</SelectItem>
								<SelectItem value="anders">
									Anders (mestmonster nemen dier maximaal 6 weken voor keuring)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Deelname bedrijfsgroep</Label>
						<Select onValueChange={(e) => setGroup(e)}>
							<SelectTrigger>
								<SelectValue placeholder="Selecteer antwoord" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button
						onClick={(e) => {
							e.preventDefault();
							setPersonalInfoDone(true);
						}}
						disabled={
							name == "" ||
							email == "" ||
							phone == "" ||
							street == "" ||
							postal == "" ||
							ubn == "" ||
							ibr == "" ||
							bvd == "" ||
							paratbc == "" ||
							group == ""
						}
					>
						Volgende
					</Button>
				</div>
			) : (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="aantalKoeien">
							Aantal Opgegeven Koeien: {cowList.length}
						</Label>
						<hr />
						<div className="grid grid-flow-col gap-2 overflow-x-scroll">
							{cowList.map((cow, index) => (
								<div key={index} className="min-w-40 w-full">
									<p>{cow.name}</p>
									<p>{cow.number}</p>
									<p>{cow.birth}</p>
									<p>{cow.calf}</p>
									<p>{cow.calved}</p>
								</div>
							))}
						</div>
						<hr />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="cowName">Naam rund</Label>
						<Input
							type="string"
							id="cowName"
							value={cowName}
							onChange={(e) => setCowName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="cowNumber">Leef Nummer</Label>
						<Input
							type="string"
							id="cowNumber"
							value={cowNumber}
							onChange={(e) => setCowNumber(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="cowBirth">Geboorte Datum</Label>
						<Input
							type="date"
							id="cowBirth"
							value={cowBirth}
							onChange={(e) => setCowBirth(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="calfDate">Kalf Datum </Label>
						<Input
							type="date"
							id="calfDate"
							value={calfDate}
							onChange={(e) => setCalfDate(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="calvedCount">Hoeveel keer gekalfd</Label>
						<Input
							type="number"
							id="calvedCount"
							value={calvedCount}
							onChange={(e) => setCalvedCount(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Button
							disabled={
								cowName == "" ||
								cowNumber == "" ||
								cowBirth == "" ||
								calfDate == "" ||
								calvedCount == ""
							}
							onClick={(e) => {
								e.preventDefault();
								setCowList([
									...cowList,
									{
										name: cowName,
										number: cowNumber,
										birth: cowBirth,
										calf: calfDate,
										calved: calvedCount,
									},
								]);
								setCowName("");
								setCowNumber("");
								setCowBirth("");
								setCalfDate("");
								setCalvedCount("");
							}}
						>
							Voeg koe toe
						</Button>
					</div>
					<hr />
					<div className="flex flex-row gap-2">
						<Checkbox onCheckedChange={(e) => setCowInfoDone(e as boolean)} />
						<Label className="w-fit">
							Weet je zeker dat je je wilt Inschrijven?
						</Label>
					</div>
					<Button
						disabled={!cowInfoDone}
						onClick={(e) => {
							e.preventDefault();
							console.log({
								name: name,
								email: email,
								phone: phone,
								street: street,
								postal: postal,
								ubn: ubn,
								ibr: ibr,
								bvd: bvd,
								paratbc: paratbc,
								group: group,
								cowList: cowList,
							});
						}}
					>
						Inschrijven
					</Button>
				</div>
			)}

			{/* <Button type="submit">Registreren</Button> */}
		</form>
	);
}
