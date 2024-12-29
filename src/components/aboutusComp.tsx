import { Card } from "./ui/card";

export default function AboutusComp() {
	return (
		<div>
			<h2 className="text-2xl font-bold pb-2" id="over-ons">
				Over Ons
			</h2>
			<div className="flex grid-cols-2 gap-4">
				<Card className="bg-card p-4 grow">
					<h2 className="text-lg font-bold">Wat is Wintershow Flevoland?</h2>
					<p className="text-sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
						unde perspiciatis tempore perferendis commodi repellat minima
						aspernatur modi cumque! Inventore nisi consectetur saepe quis
						doloremque. Excepturi magni possimus recusandae neque?
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
