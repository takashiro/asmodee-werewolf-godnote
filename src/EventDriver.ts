import EventListener from './EventListener';

class EventDriver<EventType> {
	protected listeners: Map<EventType, EventListener<EventType, unknown>[]>;

	constructor() {
		this.listeners = new Map();
	}

	register(listener: EventListener<EventType, unknown>): void {
		const listeners = this.listeners.get(listener.event);
		if (listeners) {
			listeners.push(listener);
		} else {
			this.listeners.set(listener.event, [listener]);
		}
	}

	async trigger<ParamType>(event: EventType, data: ParamType): Promise<boolean> {
		const listeners = this.listeners.get(event);
		if (!listeners || listeners.length <= 0) {
			return false;
		}

		for (const listener of listeners) {
			if (listener.isTriggerable(data)) {
				const prevented = await listener.process(data);
				if (prevented) {
					return true;
				}
			}
		}

		return true;
	}
}

export default EventDriver;
