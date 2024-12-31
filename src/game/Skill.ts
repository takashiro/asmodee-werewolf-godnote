import Period from './Period.js';
import type EventListener from './EventListener.js';

export abstract class Skill<DriverType, PlayerType> {
	constructor(
		protected readonly driver: DriverType,
		protected readonly owner: PlayerType,
		protected readonly period: Period,
	) {
	}

	getPeriod(): Period {
		return this.period;
	}

	getOwner(): PlayerType {
		return this.owner;
	}

	getPriority(): number {
		return 0;
	}

	abstract isFeasible(selected: PlayerType[]): boolean;

	abstract execute(selected: PlayerType[]): void;

	getEffects(): EventListener<number, unknown>[] | undefined {
		return undefined;
	}
}

export default Skill;
