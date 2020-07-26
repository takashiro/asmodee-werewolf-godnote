interface EventListener<EventType, ParamType> {
	event: EventType;
	isTriggerable(param: ParamType): boolean;
	process(param: ParamType): Promise<boolean>;
}

export default EventListener;
