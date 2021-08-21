import Board from '../../src/driver/Board';
import Player from '../../src/driver/Player';

const board = new Board();
const players = [
	new Player(1),
	new Player(2),
];

it('does not expose direct access to players', () => {
	board.setPlayers(players);
	expect(board.getPlayers()).not.toBe(players);
});

it('filters a live players', () => {
	jest.spyOn(players[0], 'isAlive').mockReturnValue(false);
	const alive = board.getAlivePlayers();
	expect(alive).toHaveLength(1);
	expect(alive).toContain(players[1]);
});

it('starts from Day 1', () => {
	expect(board.getDay()).toBe(1);
	board.tick();
	expect(board.getDay()).toBe(2);
});
