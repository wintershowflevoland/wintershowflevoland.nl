import PDFViewer from "@/components/PDFViewer";

export default function Uitslag() {
	return (
		<div className="m-auto text-center">
			<PDFViewer
				pdfUrl="assets/Uitslag.pdf"
				noResultsMessage="Uitslagen zijn nog niet bekend."
			/>
		</div>
	);
}
