import Player from './Player';
import EventDriver from './EventDriver';
import GameEvent from './GameEvent';

class Board extends EventDriver<GameEvent> {
	protected players: Player[];

	protected date: number;

	constructor() {
		super();
		this.players = [];
		this.date = 0;
	}

	addPlayer(player: Player): void {
		this.players.push(player);
	}

	removePlayer(player: Player): void {
		const i = this.players.indexOf(player);
		if (i >= 0) {
			this.players.splice(i, 1);
		}
	}

	getPlayers(): Player[] {
		return this.players;
	}

	getAlivePlayers(): Player[] {
		return this.players.filter((player) => player.isAlive());
	}

	tickDate(): void {
		this.date++;
	}

	getDate(): number {
		return this.date;
	}
}

export default Board;
