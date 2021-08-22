import EventListener from '../util/EventListener';

import Skill from './Skill';

export default abstract class SkillEffect<ParamType> extends EventListener<ParamType> {
	protected readonly skill: Skill;

	constructor(skill: Skill, event: number) {
		super(event);
		this.skill = skill;
	}
}
