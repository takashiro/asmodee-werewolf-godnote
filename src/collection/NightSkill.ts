import type Board from '../game/Board.js';
import type Player from '../game/Player.js';
import Period from '../game/Period.js';
import Skill from './Skill.js';

export abstract class NightSkill extends Skill {
	constructor(board: Board, owner: Player) {
		super(board, owner, Period.Night);
	}
}

export default NightSkill;
