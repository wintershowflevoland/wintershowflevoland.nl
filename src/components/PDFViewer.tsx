"use client";

import { useEffect, useState } from "react";
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
		<iframe src={pdfUrl} className="w-full h-[90dvh]" />
	) : (
		<p className="h-5 w-[250px]">{noResultsMessage}</p>
	);
}
