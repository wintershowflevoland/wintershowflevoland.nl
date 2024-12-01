"use client";
import { useEvent } from "@/context/EventContext";
import { Button } from "./ui/button";

export default function AanmeldButton() {
	const { triggerEvent } = useEvent();

	const handelAanmelden = (): void => {
		triggerEvent("AanmeldDialog");
	};

	return <Button onClick={handelAanmelden}>Aanmelden</Button>;
}
