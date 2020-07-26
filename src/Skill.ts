import { Role } from '@asmodee/werewolf-core';

import GameEvent from './GameEvent';

class Skill {
	public readonly event: GameEvent;

	protected role: Role;

	constructor(event: GameEvent, role: Role) {
		this.event = event;
		this.role = role;
	}

	getRole(): Role {
		return this.role;
	}
}

export default Skill;
