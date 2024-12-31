import Board from '../game/Board.js';
import Event from '../game/Event.js';
import EventListener from '../game/EventListener.js';

export abstract class SkillEffect<ParamType> extends EventListener<Event, ParamType> {
	constructor(
		event: Event,
		protected readonly board: Board,
	) {
		super(event);
	}
}

export default SkillEffect;
