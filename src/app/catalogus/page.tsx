"use client"; // Ensures it runs only on the client side
// import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export default function PDFViewer() {
	return (
		<div className="flex flex-col items-center">
			{/* <EmbedPDF
				companyIdentifier="react-viewer"
				mode="inline"
				className="w-full h-screen mx-auto"
				documentURL={"assets/Catalogus.pdf"}
			/> */}
			<iframe src="assets/Catalogus.pdf" className="w-full h-[90dvh]"></iframe>
		</div>
	);
}
