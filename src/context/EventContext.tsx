// context/EventContext.tsx
"use client"; // Add this line
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

// Define types for our context
interface EventContextType {
	eventState: string | null;
	triggerEvent: (event: string) => void;
}

// Create the context with default values
const EventContext = createContext<EventContextType | undefined>(undefined);

// Hook to use the event context
export const useEvent = (): EventContextType => {
	const context = useContext(EventContext);
	if (!context) {
		throw new Error("useEvent must be used within an EventProvider");
	}
	return context;
};

// EventProvider component to wrap the app with
interface EventProviderProps {
	children: ReactNode;
}

export const EventProvider = ({
	children,
}: EventProviderProps): JSX.Element => {
	const [eventState, setEventState] = useState<string | null>(null);

	const triggerEvent = useCallback((event: string) => {
		setEventState(event);
	}, []);

	return (
		<EventContext.Provider value={{ eventState, triggerEvent }}>
			{children}
		</EventContext.Provider>
	);
};
