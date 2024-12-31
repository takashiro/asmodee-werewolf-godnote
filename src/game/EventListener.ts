export abstract class EventListener<EventType, ParamType> {
	readonly event: EventType;

	constructor(event: EventType) {
		this.event = event;
	}

	abstract process(param: ParamType): Promise<boolean>;
}

export default EventListener;
