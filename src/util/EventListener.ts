abstract class EventListener<ParamType> {
	readonly event: number;

	constructor(event: number) {
		this.event = event;
	}

	abstract isTriggerable(param: ParamType): boolean;

	abstract process(param: ParamType): Promise<boolean>;
}

export default EventListener;
