import GameEvent from './GameEvent';
import Player from './Player';
import SkillEffect from './SkillEffect';

class Skill {
	protected readonly event: GameEvent;

	protected readonly owner: Player;

	protected priority: number;

	protected selected: Player[] = [];

	protected effects?: SkillEffect<unknown>[];

	constructor(owner: Player, event: GameEvent, priority = 0) {
		this.event = event;
		this.owner = owner;
		this.priority = priority;
	}

	getEvent(): GameEvent {
		return this.event;
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
