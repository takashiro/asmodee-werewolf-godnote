import { Role } from '@asmodee/werewolf-core';

import Skill from './Skill';
import Board from './Board';
import EventListener from './EventListener';
import GameEvent from './GameEvent';

abstract class PassiveSkill<ParamType> extends Skill implements EventListener<ParamType> {
	protected board: Board;

	constructor(board: Board, event: GameEvent, role: Role) {
		super(event, role);
		this.board = board;
	}

	abstract isTriggerable(data: ParamType): boolean;

	abstract process(data: ParamType): Promise<boolean>;
}

export default PassiveSkill;
