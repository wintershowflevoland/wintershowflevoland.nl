export default function BottomFotoRapperComp() {
	return (
		<div className="-z-10 overflow-hidden">
			<img
				className="w-[25vw] fixed bottom-0 left-[-50px] rounded-md"
				src="/assets/site/foto-bottom-left.jpg"
				alt=""
			/>
			<img
				className="w-[25vw] fixed bottom-0 right-[-50px] rounded-md transform -scale-x-100"
				src="/assets/site/foto-bottom-right.jpg"
				alt=""
			/>
		</div>
	);
}
