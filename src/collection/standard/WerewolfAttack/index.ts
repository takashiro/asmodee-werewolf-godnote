import type Player from '../../../game/Player.js';
import NightSkill from '../../NightSkill.js';
import { WerewolfAttacked } from '../tags.js';
import { WerewolfAttackEffect } from './WerewolfAttackEffect.js';

export class WerewolfAttack extends NightSkill {
	isFeasible(selected: Player[]): boolean {
		return selected.length === 1;
	}

	override async execute(targets: Player[]): Promise<void> {
		const [target] = targets;
		target.addTag(WerewolfAttacked);

		const players = this.driver.getAlivePlayers();
		for (const player of players) {
			for (const skill of player.getSkills()) {
				if (skill instanceof WerewolfAttack) {
					skill.setFinished(true);
				}
			}
		}
	}

	override getEffects(): WerewolfAttackEffect[] {
		return [
			new WerewolfAttackEffect(this.driver),
		];
	}
}

export default WerewolfAttack;
