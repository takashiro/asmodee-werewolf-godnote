import { it, expect } from '@jest/globals';
import { Role } from '@asmodee/werewolf-core';

import Board from '../../../src/game/Board.js';
import Player from '../../../src/game/Player.js';

import standard from '../../../src/collection/standard/index.js';
import Period from '../../../src/game/Period.js';

const board = new Board();
board.setPlayers([
	new Player(1, [Role.Werewolf]),
	new Player(2, [Role.Werewolf]),
	new Player(3, [Role.Werewolf]),
	new Player(4, [Role.Werewolf]),
	new Player(5, [Role.Villager]),
	new Player(6, [Role.Villager]),
	new Player(7, [Role.Villager]),
	new Player(8, [Role.Villager]),
	new Player(9, [Role.Seer]),
	new Player(10, [Role.Witch]),
	new Player(11, [Role.Guard]),
	new Player(12, [Role.Hunter]),
]);
board.setCollections([standard]);

it('starts the game', async () => {
	await board.start();
	expect(board.getPeriod()).toBe(Period.Night);
	expect(board.isPeriodFinished()).toBe(false);
});

it('wakes up werewolves', async () => {
	const players = board.getPlayers();
	for (const player of players) {
		expect(player.isAlive()).toBe(true);
	}

	const skill1 = players[0].getSkill(0)!;
	expect(skill1.isFeasible([players[0], players[2]])).toBe(false);

	const targets = [players[7]];
	expect(skill1.isFeasible(targets)).toBe(true);
	expect(skill1.isFinished()).toBe(false);
	await skill1.execute([players[7]]);

	expect(skill1.isFinished()).toBe(true);
	const skill2 = players[0].getSkill(0)!;
	expect(skill2.isFinished()).toBe(true);
	const skill3 = players[0].getSkill(0)!;
	expect(skill3.isFinished()).toBe(true);
	const skill4 = players[0].getSkill(0)!;
	expect(skill4.isFinished()).toBe(true);
});

it('goes into dawn', async () => {
	expect(board.isPeriodFinished()).toBe(true);
	await board.tick();
	expect(board.getPeriod()).toBe(Period.Day);

	const victim = board.getPlayer(8)!;
	expect(victim.isAlive()).toBe(false);

	const alivePlayers = board.getAlivePlayers();
	expect(alivePlayers).toHaveLength(11);
});
