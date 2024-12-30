import { Card } from "./ui/card";

export default function AboutusComp() {
	return (
		<div>
			<h2 className="text-2xl font-bold pb-2" id="over-ons">
				Over Ons
			</h2>
			<div className="flex grid-cols-2 gap-4">
				<Card className="bg-card p-4 grow overflow-y-scroll max-h-[80vh]">
					<h2 className="text-lg font-bold">Wat is Wintershow Flevoland?</h2>
					<p className="text-sm">
						De Wintershow Commissie Flevoland organiseert jaarlijks een
						rundveeshow waar melkveehouders uit de regio vol trots hun mooiste
						dieren showen. Naast het competitieve aspect is ons evenement ook
						een sociale gelegenheid. Hier ontmoeten veehouders, burgers en
						bedrijven uit de sector elkaar in een informele sfeer.
					</p>
					<p className="text-sm">
						De Provinciale Wintershow heeft een rijke traditie in Flevoland. Al
						meer dan 30 edities vond de keuring plaats op de eerste dinsdag van
						maart in de Flevomanege. Met de verhuizing van de manege naar het
						Hippisch Centrum Flevodrome in 2023 kreeg de wintershowcommissie de
						kans om de keuring te vernieuwen. Zo hebben we de keuring naar de
						avond verplaatst en een extra jeugdactiviteit toegevoegd: een
						pinkenkeuring voor jongeren vanaf 14 jaar. De voorbereidingen voor
						deze keuring worden verzorgd door het jeugdbestuur, dat leerzame en
						leuke instructieavonden organiseert. Houd hiervoor de agenda goed in
						de gaten!
					</p>
					<p className="text-sm">
						Naast de rundveeshow organiseren we ook jaarlijks een thema-avond
						met sprekers over actuele onderwerpen in de sector. Daarnaast valt
						de organisatie van de Champions League Veebeoordelen voor
						studieclubs onder ook onze verantwoordelijkheid.
					</p>
					<p className="text-sm">
						Kortom, we bieden een breed scala aan activiteiten. Dankzij ons
						bestuur, enthousiaste vrijwilligers en trouwe sponsors kunnen we dit
						allemaal realiseren. Als bestuur blijven we ons inzetten om
						Flevolandse boeren een podium te geven om hun mooiste dieren te
						showen. We mogen ondanks de roerige tijden in de melkveehouderij
						trots zijn op onze melkveehouders!
					</p>
				</Card>
				<div>
					<img
						src="/assets/site/logo.jpeg"
						className=" min-w-32  sm:min-w-44 lg:min-w-64 max-h-96 rounded-lg"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
