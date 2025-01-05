"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { useEffect, useRef } from "react";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";

export function AanmeldDialog() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const { eventState, triggerEvent } = useEvent();

	React.useEffect(() => {
		console.log("eventState", eventState);
		if (eventState) {
			if (eventState === "AanmeldDialog") {
				setOpen(true);
			}
		}
	}, [eventState]);

	React.useEffect(() => {
		if (!open) {
			triggerEvent("AanmeldDialogClosed");
			setTimeout(() => {
				triggerEvent("");
			}, 10);
		}
	}, [open, triggerEvent]);

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				{/* <DialogTrigger asChild>
					<Button className="hover:underline">Aanmelden</Button>
				</DialogTrigger> */}
				<DialogContent className="sm:max-w-[900px]">
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
			<DrawerContent className="">
				<DrawerHeader className="text-left">
					<DrawerTitle>Aanmelden</DrawerTitle>
				</DrawerHeader>
				<AanmeldForm />
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
	// closed Date
	const formClosedDate = new Date("2025-03-01T00:00:00Z");
	//2025-02-23T00:00:00Z
	const dateOptions: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	};
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
	const [praktijk, setPraktijk] = React.useState("");
	// cow info
	const [cowList, setCowList] = React.useState<
		{
			name: string;
			number: string;
			fatherName: string;
			birth: string;
			calf: string;
			calved: string;
			rundSoort: string;
			helperName: string;
			helperAge: string;
		}[]
	>([]);
	// list items cow
	const [cowName, setCowName] = React.useState("");
	const [cowBirth, setCowBirth] = React.useState("");
	const [cowNumber, setCowNumber] = React.useState("");
	const [cowFatherName, setCowFatherName] = React.useState("");
	const [calfDate, setCalfDate] = React.useState("");
	const [calvedCount, setCalvedCount] = React.useState("");
	const [rundSoort, setRundSoort] = React.useState("");
	const [helperName, setHelperName] = React.useState("");
	const [helperAge, setHelperAge] = React.useState("");
	// opmerkingen en voorwaarden
	const [opmerkingen, setOpmerkingen] = React.useState("");
	const [voorwaarden, setVoorwaarden] = React.useState(false);
	const [termsGezondheidsDienst, setTermsGezondheidsDienst] =
		React.useState(false);
	const [termsCRV, setTermsCRV] = React.useState(false);

	const [openPageId, setOpenPageId] = React.useState(0);

	const dialogFormRef = useRef<HTMLFormElement>(null);

	const [progress, setProgress] = React.useState(0);

	useEffect(() => {
		if (dialogFormRef.current) {
			dialogFormRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [openPageId]);

	useEffect(() => {
		console.log("rundSoort", rundSoort);
		if (rundSoort == "Koe") {
			setHelperName("-");
			setHelperAge("-");
		} else {
			setHelperName("");
			setHelperAge("");
		}
	}, [rundSoort]);

	const postDataToSheet = async () => {
		setOpenPageId(3); // Show loading page
		setProgress(1);
		let success = 0;

		// Loop through each cowItem using for...of (which works well with async/await)
		for (const cowItem of cowList) {
			try {
				const response = await fetch(
					"https://script.google.com/macros/s/AKfycbyGv2Isdufrx8x6BxQlan7iwoCdKlAFvBO3TW4rho8FmAREnZbT4uru9bTJrwLvjO2L6w/exec",
					{
						redirect: "follow",
						method: "POST",
						headers: {
							"Content-Type": "text/plain;charset=utf-8",
						},
						body: JSON.stringify(
							{
								name: name,
								email: email,
								phone: phone,
								street: street,
								postal: postal,
								ubn: ubn,
								ibr: ibr == "1" ? "Ja" : "Nee",
								bvd: bvd == "1" ? "Ja" : "Nee",
								paratbc: paratbc,
								group: group == "1" ? "Ja" : "Nee",
								praktijk: praktijk,
								opmerkingen: opmerkingen || "-",
								voorwaarden: voorwaarden ? "Ja" : "Nee",
								termsGezondheidsDienst: termsGezondheidsDienst ? "Ja" : "Nee",
								termsCRV: termsCRV ? "Ja" : "Nee",
								rundName: cowItem.name,
								rundNumber: cowItem.number,
								rundFatherName: cowItem.fatherName,
								rundBirth: new Date(cowItem.birth).toLocaleDateString(
									"nl-NL",
									dateOptions
								),
								calfDate: new Date(cowItem.calf).toLocaleDateString(
									"nl-NL",
									dateOptions
								),
								calvedCount: cowItem.calved,
								rundSoort: cowItem.rundSoort,
								helperName: cowItem.helperName,
								helperAge: cowItem.helperAge,
							},
							null,
							2
						),
					}
				);

				// Parse JSON response after waiting for fetch to complete
				const responseData = await response.json();

				if (responseData.success) {
					success += 1;
					setProgress((success / cowList.length) * 100);
				}
			} catch (error) {
				console.error("Error in sending data for cowItem:", cowItem, error);
			}
		}

		// Check if all cows were successfully added
		if (success === cowList.length) {
			setProgress(100);
			setOpenPageId(4); // Show success page
		} else {
			setOpenPageId(5); // Show error page
		}
	};

	if (new Date() > formClosedDate && openPageId !== 10) {
		setOpenPageId(10);
	}

	return (
		<form
			ref={dialogFormRef}
			className={cn(
				"[&>div]:grid [&>div]:items-start [&>div]:gap-4 max-h-[80dvh] px-4 overflow-y-scroll",
				className
			)}
			onSubmit={(e) => e.preventDefault()}
			onTouchCancel={(e) => e.preventDefault()}
			onAbort={(e) => e.preventDefault()}
			onPointerCancel={(e) => e.preventDefault()}
		>
			{openPageId == 0 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Naam</Label>
						<Input
							type="text"
							id="name"
							placeholder="Voornaam Achternaam"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">E-Mailadres</Label>
						<Input
							type="email"
							id="email"
							placeholder="naam@me.mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="phone">Telefoon</Label>
						<Input
							type="phone"
							id="phone"
							placeholder="0601234567"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
							pattern="(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Straat + Huis Nummer</Label>
						<Input
							type="text"
							id="name"
							value={street}
							onChange={(e) => setStreet(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Postcode + Woon Plaats</Label>
						<Input
							type="text"
							id="name"
							value={postal}
							onChange={(e) => setPostal(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="ubn">UBN nummer</Label>
						<Input
							type="text"
							id="ubn"
							value={ubn}
							onChange={(e) => setUbn(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">IBR vrij</Label>
						<Select onValueChange={(e) => setIbr(e)}>
							{ibr == "" && (
								<SelectTrigger>
									<SelectValue placeholder="Selecteer antwoord" />
								</SelectTrigger>
							)}
							{ibr == "1" && (
								<SelectTrigger>
									<SelectValue placeholder="Ja" />
								</SelectTrigger>
							)}
							{ibr == "0" && (
								<SelectTrigger>
									<SelectValue placeholder="Nee" />
								</SelectTrigger>
							)}
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">BVD vrij</Label>
						<Select onValueChange={(e) => setBvd(e)}>
							{bvd == "" && (
								<SelectTrigger>
									<SelectValue placeholder="Selecteer antwoord" />
								</SelectTrigger>
							)}
							{bvd == "1" && (
								<SelectTrigger>
									<SelectValue placeholder="Ja" />
								</SelectTrigger>
							)}
							{bvd == "0" && (
								<SelectTrigger>
									<SelectValue placeholder="Nee" />
								</SelectTrigger>
							)}
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Paratbc Status</Label>
						<Select onValueChange={(e) => setParatbc(e)}>
							{paratbc == "" && (
								<SelectTrigger>
									<SelectValue placeholder="Selecteer antwoord" />
								</SelectTrigger>
							)}
							{paratbc == "a" && (
								<SelectTrigger>
									<SelectValue placeholder="A" />
								</SelectTrigger>
							)}
							{paratbc == "6t/m10" && (
								<SelectTrigger>
									<SelectValue placeholder="6 t/m 10" />
								</SelectTrigger>
							)}
							{paratbc == "anders" && (
								<SelectTrigger>
									<SelectValue placeholder="Anders (mestmonster nemen dier maximaal 6 weken voor keuring)" />
								</SelectTrigger>
							)}
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
						<Label htmlFor="name">Naam Dierenartspraktijk</Label>
						<Input
							type="text"
							id="name"
							placeholder="Praktijk naam"
							value={praktijk}
							onChange={(e) => setPraktijk(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Deelname bedrijfsgroep</Label>
						<Select onValueChange={(e) => setGroup(e)}>
							{group == "" && (
								<SelectTrigger>
									<SelectValue placeholder="Selecteer antwoord" />
								</SelectTrigger>
							)}
							{group == "1" && (
								<SelectTrigger>
									<SelectValue placeholder="Ja" />
								</SelectTrigger>
							)}
							{group == "0" && (
								<SelectTrigger>
									<SelectValue placeholder="Nee" />
								</SelectTrigger>
							)}
							<SelectContent>
								<SelectItem value="1">Ja</SelectItem>
								<SelectItem value="0">Nee</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<hr />
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							disabled={true}
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(openPageId - 1);
							}}
						>
							Vorige
						</Button>
						<Button
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(openPageId + 1);
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
								group == "" ||
								praktijk == ""
							}
						>
							Volgende
						</Button>
					</div>
				</div>
			)}

			{openPageId == 1 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="aantalKoeien">
							Aantal Opgegeven Dieren: {cowList.length}
						</Label>
						<hr />
						<div className="grid grid-flow-col gap-2 overflow-x-scroll">
							<div key={"ValuesName"} className="min-w-40 w-full font-semibold">
								<p>Naam rund:</p>
								<p>Levensnummer:</p>
								<p>Naam vader:</p>
								<p>Geboortedatum:</p>
								<p>Kalfdatum:</p>
								<p>Aantal kalvingen:</p>
								<p>Naam begeleider:</p>
								<p>Leeftijd begeleider:</p>
							</div>
							{cowList.map((cow, index) => (
								<div key={index} className="min-w-40 w-full">
									<p>{cow.name}</p>
									<p>{cow.number}</p>
									<p>{cow.fatherName}</p>
									<p>{cow.birth}</p>
									<p>{cow.calf}</p>
									<p>{cow.calved}</p>
									<p>{cow.helperName}</p>
									<p>{cow.helperAge}</p>
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
						<Label htmlFor="cowNumber">Levensnummer</Label>
						<Input
							type="string"
							id="cowNumber"
							value={cowNumber}
							onChange={(e) => setCowNumber(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Naam vader</Label>
						<Input
							type="text"
							id="cowFatherName"
							placeholder=""
							value={cowFatherName}
							onChange={(e) => setCowFatherName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="cowBirth">Geboorte Datum</Label>
						<Input
							type="date"
							id="cowBirth"
							value={cowBirth}
							onChange={(e) => setCowBirth(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="calfDate">Kalf Datum </Label>
						<Input
							type="date"
							id="calfDate"
							value={calfDate}
							onChange={(e) => setCalfDate(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="calvedCount">Hoeveel keer gekalfd</Label>
						<Input
							type="number"
							id="calvedCount"
							value={calvedCount}
							onChange={(e) => setCalvedCount(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Soort rund.</Label>
						<Select onValueChange={(e) => setRundSoort(e)}>
							{rundSoort == "" && (
								<SelectTrigger>
									<SelectValue placeholder="Selecteer antwoord" />
								</SelectTrigger>
							)}
							{rundSoort == "Koe" && (
								<SelectTrigger>
									<SelectValue placeholder="Koe" />
								</SelectTrigger>
							)}
							{rundSoort == "Pink" && (
								<SelectTrigger>
									<SelectValue placeholder="Pink" />
								</SelectTrigger>
							)}
							<SelectContent>
								<SelectItem value="Koe">Koe</SelectItem>
								<SelectItem value="Pink">Pink</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className={rundSoort == "Pink" ? "grid gap-2" : "hidden"}>
						<Label htmlFor="helperName">Naam Begeleider</Label>
						<Input
							type="string"
							id="helperName"
							value={helperName}
							onChange={(e) => setHelperName(e.target.value)}
						/>
					</div>
					<div className={rundSoort == "Pink" ? "grid gap-2" : "hidden"}>
						<Label htmlFor="helperAge">Leeftijd Begeleider</Label>
						<Input
							type="number"
							id="helperAge"
							value={helperAge}
							onChange={(e) => setHelperAge(e.target.value)}
							onBlur={(e) => e.target.reportValidity()}
						/>
					</div>
					<div className="grid gap-2">
						<Button
							disabled={
								cowName == "" ||
								cowNumber == "" ||
								cowFatherName == "" ||
								cowBirth == "" ||
								calfDate == "" ||
								calvedCount == "" ||
								rundSoort == "" ||
								helperName == "" ||
								helperAge == ""
							}
							onClick={(e) => {
								e.preventDefault();
								setCowList([
									...cowList,
									{
										name: cowName,
										number: cowNumber,
										fatherName: cowFatherName,
										birth: cowBirth,
										calf: calfDate,
										calved: calvedCount,
										rundSoort: rundSoort,
										helperName: helperName,
										helperAge: helperAge,
									},
								]);
								setCowName("");
								setCowNumber("");
								setCowFatherName("");
								setCowBirth("");
								setCalfDate("");
								setCalvedCount("");
								setHelperName("-");
								setHelperAge("-");
							}}
						>
							Voeg koe toe
						</Button>
					</div>
					{/* Volgende acoord gaan voorwaarden. */}

					<hr />
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(openPageId - 1);
							}}
						>
							Vorige
						</Button>
						<Button
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(openPageId + 1);
							}}
							disabled={cowList.length == 0}
						>
							Volgende
						</Button>
					</div>
				</div>
			)}

			{openPageId == 2 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="aanmerkingen">
							<b>Overige op- of aanmerkingen?</b>
						</Label>
						<Textarea
							id="aanmerkingen"
							value={opmerkingen}
							onChange={(e) => setOpmerkingen(e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-2">
						<div>
							<b>Algemene voorwaarden keuring *</b>
							<p>
								* Het is mogelijk om met een bedrijfsgroep mee te doen,
								bestaande uit drie dieren.{" "}
							</p>
							<p>
								* Dieren van niet BVD gecertificeerde bedrijven moeten worden
								onderzocht op aanwezigheid van BVD-virus. Alleen BVD-virusvrije
								dieren worden toegelaten.
							</p>
							<p>
								* Alleen koeien van bedrijven met een lepto-vrije status worden
								op de wintershow toegelaten. *
							</p>
							<p>
								Voor een paratbc-veilige keuring dienen de bedrijven (zonder
								status A of status 6 t/m 10) maximaal 6 weken voor de keuring
								een gunstige uitslag van mestonderzoek van de deelnemende dieren
								(alle leeftijden) aan te leveren.
							</p>
							<p>
								* Bedrijven met dieren die tijdens de keuring in observatie zijn
								kunnen niet aan de keuring deelnemen. Met nadruk vragen wij u om
								hierop te letten omdat dit verstrekkende gevolgen kan hebben
								voor u, uw collega’s en de wintershow in zijn algemeenheid.
							</p>
							<p>
								* De commissie gaat er van uit dat uw bedrijf voldoet aan de
								algemeen geldende veterinaire eisen.
							</p>
							<p>
								* De commissie zal trachten zoveel mogelijk voorzorgsmaatregelen
								te treffen maar stelt zich nergens aansprakelijk voor.
							</p>
							<p>
								* Alle aanwezige dieren dienen 2 leesbare oormerken te dragen
								welke corresponderen met de opgegeven koeien. Hierop zal worden
								toegezien. Bij overtreding wordt het dier niet toegelaten en
								dient het dier het terrein onmiddellijk te verlaten. Advies is
								om in ieder geval een reserve exemplaar te bestellen.
							</p>
							<p>* De koeien worden per studieclub aan de balie geplaatst.</p>
							<p>
								* Van de veehouders welke hier om veterinaire redenen problemen
								mee hebben kunnen de koeien apart aan de balie worden geplaatst.
								Wanneer gewenst geef dit op tijd aan bij het bestuur.
							</p>
							<p>
								* Zorg dat de koeien er netjes op staan. Toplijnen is enkel bij
								de pinken toegestaan.{" "}
							</p>
							<p>
								* Het is van belang om thuis met de koeien te gaan oefenen.{" "}
							</p>
							<p>
								* Zorg dat u tijdig met uw koeien aanwezig bent. De dieren
								kunnen vanaf 15.00 uur worden aangevoerd.
							</p>
							<p>
								{" "}
								* De begeleiders dienen bij voorkeur een witte blouse, een
								blauwe broek en gepast schoeisel te dragen.
							</p>
							<p>
								{" "}
								* De commissie gaat er uiteraard van uit dat de inzenders alleen
								met een gegronde reden opgegeven koeien thuis laten en dit te
								allen tijde melden aan het secretariaat.
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								required={true}
								checked={voorwaarden}
								onCheckedChange={(e) => setVoorwaarden(e as boolean)}
							/>
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Akkoord
							</label>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-2">
						<div>
							<b>
								Toestemming opvragen gegevens bij de gezondheidsdienst +
								toestemming melden I en R. *
							</b>
							<p>
								Ondergetekende geeft het bestuur van de organisatie van de
								fokveedag toestemming de bedrijfsstatus van de deelnemende
								bedrijven te controleren bij de gezondheidsdienst.
							</p>
							<p>
								Tevens wordt er toestemming gegeven aan de organisatie om de
								dieren I & R aan en af te melden de dag van de keuring.
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								required={true}
								id="terms-gezondheidsDienst"
								checked={termsCRV}
								onCheckedChange={(e) => setTermsCRV(e as boolean)}
							/>
							<label
								htmlFor="terms-gezondheidsDienst"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Akkoord
							</label>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div>
							<b>Toestemming delen gegevens met CRV *</b>
							<p>
								Ondergetekende geeft het bestuur van de organisatie van de
								fokveedag toestemming de MPR en Stamboekgegevens bij Coöperatie
								Koninklijke CRV UA van de door mij opgegeven dieren op te vragen
								voor de keuring en het publiceren van deze gegevens in de
								catalogus.
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								required={true}
								id="terms-CRV"
								checked={termsGezondheidsDienst}
								onCheckedChange={(e) => setTermsGezondheidsDienst(e as boolean)}
							/>
							<label
								htmlFor="terms-CRV"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Akkoord
							</label>
						</div>
					</div>
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(openPageId - 1);
							}}
						>
							Vorige
						</Button>
						<Button
							disabled={!voorwaarden || !termsCRV || !termsGezondheidsDienst}
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
									praktijk: praktijk,
									cowList: cowList,
									opmerkingen: opmerkingen,
									voorwaarden: voorwaarden,
									termsGezondheidsDienst: termsGezondheidsDienst,
									termsCRV: termsCRV,
								});
								postDataToSheet();
							}}
						>
							Inschrijven
						</Button>
					</div>
				</div>
			)}

			{openPageId == 3 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Gegevens verwerken...</Label>
					</div>
					<div className="flex gap-4 w-full [&>button]:grow">
						<Progress
							value={progress > 100 ? 100 : progress}
							className="w-full"
						/>
					</div>
				</div>
			)}

			{openPageId == 4 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Bedankt voor uw aanmelding</Label>
						<p>
							Uw aanmelding is ontvangen. U ontvangt een bevestiging per mail.
						</p>
					</div>
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								window.location.reload();
							}}
						>
							Sluiten
						</Button>
					</div>
				</div>
			)}

			{openPageId == 5 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Aanmeldings fout</Label>
						<p>
							Er is een fout opgetreden bij het aanmelden. Loop het formulier na
							en probeer het opnieuw.
						</p>
					</div>
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								setOpenPageId(0);
							}}
						>
							Nalopen formulier
						</Button>
					</div>
				</div>
			)}

			{openPageId == 10 && (
				<div>
					<div className="grid gap-2">
						<Label htmlFor="name">Aanmeldingen gesloten</Label>
						<p>
							De aanmeldingen voor de keuring zijn gesloten. U kunt zich niet
							meer aanmelden.
						</p>
					</div>
					<div className="flex gap-4 w-full [&>button]:grow">
						<Button
							variant="secondary"
							onClick={(e) => {
								e.preventDefault();
								window.location.reload();
							}}
						>
							Sluiten
						</Button>
					</div>
				</div>
			)}
		</form>
	);
}
