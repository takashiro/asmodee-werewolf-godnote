import { Role } from '@asmodee/werewolf-core';

import GameEvent from './GameEvent';

class Skill {
	public readonly event: GameEvent;

	protected role: Role;

	protected priority: number;

	constructor(event: GameEvent, role: Role) {
		this.event = event;
		this.role = role;
		this.priority = 0;
	}
}

export default Skill;
