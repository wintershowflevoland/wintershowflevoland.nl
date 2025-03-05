import PDFViewer from "@/components/PDFViewer";

export default function Uitslag() {
	return (
		<div className="flex flex-col items-center text-center">
			<PDFViewer
				pdfUrl="assets/Uitslag.pdf"
				noResultsMessage="Uitslagen zijn nog niet bekend."
			/>
		</div>
	);
}
