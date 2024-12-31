import { Role } from '@asmodee/werewolf-core';

import type Board from './Board.js';
import type Player from './Player.js';
import type Skill from './Skill.js';

export type SkillCreator = new(driver: Board, owner: Player) => Skill<Board, Player>;

export default abstract class Collection {
	protected skills = new Map<Role, SkillCreator[]>();

	getSkills(role: Role): SkillCreator[] | undefined {
		return this.skills.get(role);
	}
}
