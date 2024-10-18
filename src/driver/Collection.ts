import { Role } from '@asmodee/werewolf-core';

import Player from './Player.js';
import Skill from './Skill.js';

export type SkillCreator = new(owner: Player) => Skill;

export default abstract class Collection {
	abstract getSkills(role: Role): SkillCreator[] | undefined;
}
