import Board from '../../../game/Board.js';
import Event from '../../../game/Event.js';
import SkillEffect from '../../SkillEffect.js';
import { WerewolfAttacked } from '../tags.js';

export class WerewolfAttackEffect extends SkillEffect<void> {
	constructor(board: Board) {
		super(Event.BeforeSunrise, board);
	}

	async process(): Promise<void> {
		const players = this.board.getAlivePlayers();
		const victim = players.find((player) => player.hasTag(WerewolfAttacked));
		if (victim) {
			victim.setAlive(false);
		}
	}
}
