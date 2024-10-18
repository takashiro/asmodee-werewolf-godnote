import EventListener from './EventListener.js';

class EventDriver {
	protected listeners = new Map<number, EventListener<unknown>[]>();

	register(listener: EventListener<unknown>): void {
		const listeners = this.listeners.get(listener.event);
		if (listeners) {
			listeners.push(listener);
		} else {
			this.listeners.set(listener.event, [listener]);
		}
	}

	async trigger<ParamType>(event: number, data?: ParamType): Promise<boolean> {
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
