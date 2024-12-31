import Board from '../../../game/Board.js';
import Event from '../../../game/Event.js';
import Period from '../../../game/Period.js';
import SkillEffect from '../../SkillEffect.js';
import { WerewolfAttackTag } from '../constants.js';

export class WerewolfAttackEffect extends SkillEffect<void> {
	constructor(board: Board) {
		super(Event.PeriodChanged, board);
	}

	async process(): Promise<void> {
		if (this.board.getPeriod() !== Period.Dawn) {
			return;
		}

		const players = this.board.getAlivePlayers();
		for (const player of players) {
			if (player.hasTag(WerewolfAttackTag)) {
				player.setAlive(false);
				player.removeTag(WerewolfAttackTag);
			}
		}
	}
}
