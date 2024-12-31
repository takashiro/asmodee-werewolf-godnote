import EventListener from './EventListener.js';

export class EventDriver<EventType> {
	protected listeners = new Map<EventType, EventListener<EventType, unknown>[]>();

	register(listener: EventListener<EventType, unknown>): void {
		const listeners = this.listeners.get(listener.event);
		if (listeners) {
			listeners.push(listener);
		} else {
			this.listeners.set(listener.event, [listener]);
		}
	}

	async trigger<ParamType>(event: EventType, data?: ParamType): Promise<void> {
		const listeners = this.listeners.get(event);
		if (!listeners || listeners.length <= 0) {
			return;
		}
		for (const listener of listeners) {
			const prevented = await listener.process(data);
			if (prevented) {
				return;
			}
		}
	}
}

export default EventDriver;
