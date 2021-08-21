import Player from './Player';
import EventDriver from './EventDriver';
import GameEvent from './GameEvent';

class Board extends EventDriver<GameEvent> {
	protected players: Player[] = [];

	protected day = 1;

	setPlayers(players: Player[]): void {
		this.players = players;
	}

	getPlayers(): Player[] {
		return [...this.players];
	}

	getAlivePlayers(): Player[] {
		return this.players.filter((player) => player.isAlive());
	}

	tick(): void {
		this.day++;
	}

	getDay(): number {
		return this.day;
	}
}

export default Board;
