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
			birth: string;
			calf: string;
			calved: string;
			helperName: string;
			helperAge: string;
		}[]
	>([]);
	// list items cow
	const [cowName, setCowName] = React.useState("");
	const [cowBirth, setCowBirth] = React.useState("");
	const [cowNumber, setCowNumber] = React.useState("");
	const [calfDate, setCalfDate] = React.useState("");
	const [calvedCount, setCalvedCount] = React.useState("");
	const [helperName, setHelperName] = React.useState("");
	const [helperAge, setHelperAge] = React.useState("");
	// opmerkingen en voorwaarden
	const [opmerkingen, setOpmerkingen] = React.useState("");
	const [voorwaarden, setVoorwaarden] = React.useState(false);
	const [termsGezondheidsDienst, setTermsGezondheidsDienst] =
		React.useState(false);
	const [termsCRV, setTermsCRV] = React.useState(false);

	const [openPageId, setOpenPageId] = React.useState(2);

	const dialogFormRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (dialogFormRef.current) {
			dialogFormRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [openPageId]);

	return (
		<form
			ref={dialogFormRef}
			className={cn(
				"[&>div]:grid [&>div]:items-start [&>div]:gap-4 max-h-[80vh] px-4 overflow-y-scroll",
				className
			)}
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
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="phone">Telefoon</Label>
						<Input
							type="phone"
							id="phone"
							placeholder="+31600000000"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
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
								<p>RundName:</p>
								<p>LeefNummer:</p>
								<p>RundGeboorte:</p>
								<p>KalfDatum:</p>
								<p>KeerGeKalft:</p>
								<p>BegeleiderNaam:</p>
								<p>BegeleiderLeeftijd:</p>
							</div>
							{cowList.map((cow, index) => (
								<div key={index} className="min-w-40 w-full">
									<p>{cow.name}</p>
									<p>{cow.number}</p>
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
						<Label htmlFor="name">Soort rund.</Label>
						<Select onValueChange={(e) => setBvd(e)}>
							<SelectTrigger>
								<SelectValue placeholder="Selecteer antwoord" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Koe</SelectItem>
								<SelectItem value="0">Pink</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="helperName">Naam Begeleider</Label>
						<Input
							type="string"
							id="helperName"
							value={helperName}
							onChange={(e) => setHelperName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="helperAge">Leeftijd Begeleider</Label>
						<Input
							type="number"
							id="helperAge"
							value={helperAge}
							onChange={(e) => setHelperAge(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Button
							disabled={
								cowName == "" ||
								cowNumber == "" ||
								cowBirth == "" ||
								calfDate == "" ||
								calvedCount == "" ||
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
										birth: cowBirth,
										calf: calfDate,
										calved: calvedCount,
										helperName: helperName,
										helperAge: helperAge,
									},
								]);
								setCowName("");
								setCowNumber("");
								setCowBirth("");
								setCalfDate("");
								setCalvedCount("");
								setHelperName("");
								setHelperAge("");
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
						<Input
							type="string"
							id="aanmerkingen"
							value={opmerkingen}
							onChange={(e) => setOpmerkingen(e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-2">
						<div>
							<b>Algemene voorwaarden keuring</b>
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
								toestemming melden I en R.
							</b>
							<p>
								Ondergetekende geeft het bestuur van de organisatie van de
								fokveedag toestemming de bedrijfsstatus van de deelnemende
								bedrijven te controleren bij de gezondheidsdienst.
							</p>
							<p>
								Tevens wordt er toestemming gegeven aan de organisatie om de
								dieren I en R te melden de dag van de keuring.
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
							<b>Toestemming delen gegevens met CRV</b>
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
							}}
						>
							Inschrijven
						</Button>
					</div>
				</div>
			)}

			{/* <Button type="submit">Registreren</Button> */}
		</form>
	);
}
