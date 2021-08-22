import { Role } from '@asmodee/werewolf-core';

import Player from './Player';
import Skill from './Skill';

export type SkillCreator = new(owner: Player) => Skill;

export default abstract class Collection {
	abstract getSkills(role: Role): SkillCreator[] | undefined;
}
