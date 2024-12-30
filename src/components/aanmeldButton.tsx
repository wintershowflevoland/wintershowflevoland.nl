"use client";
import { useEvent } from "@/context/EventContext";
import { Button } from "./ui/button";

export default function AanmeldButton() {
	const { triggerEvent } = useEvent();

	const handelAanmelden = (): void => {
		triggerEvent("AanmeldDialog");
		setTimeout(() => {
			triggerEvent("");
		}, 10);
	};

	return <Button onClick={handelAanmelden}>Aanmelden</Button>;
}
