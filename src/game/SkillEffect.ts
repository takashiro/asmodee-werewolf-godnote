import EventListener from '../driver/EventListener.js';

import Skill from './Skill.js';

export default abstract class SkillEffect<ParamType> extends EventListener<ParamType> {
	protected readonly skill: Skill;

	constructor(skill: Skill, event: number) {
		super(event);
		this.skill = skill;
	}
}
