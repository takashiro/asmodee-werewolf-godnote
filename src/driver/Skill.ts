import Period from './Period.js';
import Player from './Player.js';
import SkillEffect from './SkillEffect.js';

class Skill {
	protected readonly owner: Player;

	protected readonly period: Period;

	protected priority: number;

	protected selected: Player[] = [];

	protected effects?: SkillEffect<unknown>[];

	constructor(owner: Player, period: Period, priority = 0) {
		this.period = period;
		this.owner = owner;
		this.priority = priority;
	}

	getPeriod(): Period {
		return this.period;
	}

	getOwner(): Player {
		return this.owner;
	}

	getPriority(): number {
		return this.priority;
	}

	filterPlayer(target: Player): boolean {
		return this.selected.length <= 0 && target.isAlive();
	}

	isFeasible(): boolean {
		return this.selected.length === 1;
	}

	select(target: Player): void {
		this.selected.push(target);
	}

	execute(): void {
		this.selected = [];
	}

	getEffects(): SkillEffect<unknown>[] | undefined {
		return this.effects;
	}
}

export default Skill;
