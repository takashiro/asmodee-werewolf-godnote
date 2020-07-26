interface EventListener<EventType, ParamType> {
	readonly event: EventType;
	isTriggerable(param: ParamType): boolean;
	process(param: ParamType): Promise<boolean>;
}

export default EventListener;
