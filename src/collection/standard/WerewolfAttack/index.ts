import type Player from '../../../game/Player.js';
import NightSkill from '../../NightSkill.js';
import { WerewolfAttackTag } from '../constants.js';
import { WerewolfAttackEffect } from './WerewolfAttackEffect.js';

export class WerewolfAttack extends NightSkill {
	isFinished(): boolean {
		const players = this.driver.getAlivePlayers();
		return players.some((player) => player.hasTag(WerewolfAttackTag));
	}

	isFeasible(selected: Player[]): boolean {
		return selected.length === 1;
	}

	override async execute(targets: Player[]): Promise<void> {
		const [target] = targets;
		target.addTag(WerewolfAttackTag);
	}

	override getEffects(): WerewolfAttackEffect[] {
		return [
			new WerewolfAttackEffect(this.driver),
		];
	}
}

export default WerewolfAttack;
