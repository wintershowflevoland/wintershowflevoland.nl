"use client";
import PDFViewer from "@/components/PDFViewer";

// Ensures it runs only on the client side
// import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export default function Catalogus() {
	return (
		<div className="flex flex-col items-center">
			<PDFViewer pdfUrl="assets/Catalogus.pdf" />
		</div>
	);
}
