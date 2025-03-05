"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface PDFViewerProps {
	pdfUrl: string;
	noResultsMessage?: string;
}

export default function PDFViewer({
	pdfUrl,
	noResultsMessage = "This PDF is not yet available.",
}: PDFViewerProps) {
	const [pdfExists, setPdfExists] = useState<boolean | null>(null);

	useEffect(() => {
		const checkPDF = async () => {
			try {
				const response = await fetch(pdfUrl, { method: "HEAD" });

				if (response.ok) {
					setPdfExists(true);
				} else if (response.status === 404) {
					setPdfExists(false);
				}
			} catch {
				setPdfExists(false);
			}
		};

		checkPDF();
	}, [pdfUrl]);

	if (pdfExists === null) return <Skeleton className="h-5 w-[250px]" />;

	return pdfExists ? (
		<>
			<embed
				src={pdfUrl}
				className="w-full max-w-[90dvh] h-[90dvh]"
				type="application/pdf"
			/>
			<br />
			<a href={pdfUrl} target="_blank">
				<Button onClick={() => null}>View PDF</Button>
			</a>
		</>
	) : (
		<p className="h-5 w-[250px]">{noResultsMessage}</p>
	);
}
