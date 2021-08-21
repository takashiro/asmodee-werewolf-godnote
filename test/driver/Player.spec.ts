import {
	Role,
	Team,
} from '@asmodee/werewolf-core';

import Player from '../../src/driver/Player';

const player = new Player(8, [Role.AlphaWolf]);

it('has a role of alpha wolf', () => {
	expect(player.hasRole(Role.AlphaWolf)).toBe(true);
});

it('is on team werewolf', () => {
	expect(player.hasTeamship(Team.Werewolf)).toBe(true);
});

it('changes his role', () => {
	const changed = jest.fn();
	player.once('roleChanged', changed);
	player.setRole([Role.Villager]);
	expect(player.getRole()).toStrictEqual([Role.Villager]);
	expect(changed).toBeCalledWith([Role.Villager]);
});

it('is killed', () => {
	const alive = jest.fn();
	player.once('aliveChanged', alive);
	expect(player.isAlive()).toBe(true);
	player.setAlive(false);
	expect(player.isAlive()).toBe(false);
	expect(alive).toBeCalledWith(false);
});

it('can have tags', () => {
	const changed = jest.fn();
	player.once('tagChanged', changed);
	player.addTag('poisoned');
	expect(changed).toBeCalledWith(['poisoned']);
	expect(player.hasTag('poisoned')).toBe(true);
});

it('cannot have duplicate tags', () => {
	expect(player.addTag('poisoned')).toBe(false);
});

it('can remove tags', () => {
	const changed = jest.fn();
	player.once('tagChanged', changed);
	expect(player.removeTag('poisoned')).toBe(true);
	expect(changed).toBeCalledWith([]);
	expect(player.hasTag('poisoned')).toBe(false);
	expect(player.removeTag('poisoned')).toBe(false);
});
