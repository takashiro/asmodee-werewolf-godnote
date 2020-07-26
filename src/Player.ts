import { EventEmitter } from 'events';
import {
	Role,
	Team,
	Teamship,
} from '@asmodee/werewolf-core';

import Skill from './Skill';

interface Player {
	on(event: 'roleChanged', listener: (role: Role[]) => void): this;
	on(event: 'aliveChanged', listener: (alive: boolean) => void): this;
	on(event: 'tagChanged', listener: (tags: string[]) => void): this;

	once(event: 'roleChanged', listener: (role: Role[]) => void): this;
	once(event: 'aliveChanged', listener: (alive: boolean) => void): this;
	once(event: 'tagChanged', listener: (tags: string[]) => void): this;

	off(event: 'roleChanged', listener: (role: Role[]) => void): this;
	off(event: 'aliveChanged', listener: (alive: boolean) => void): this;
	off(event: 'tagChanged', listener: (tags: string[]) => void): this;
}

class Player extends EventEmitter {
	protected seat: number;

	protected role: Role[];

	protected extraRoles: Role[];

	protected tags: Set<string>;

	protected skills: Skill[];

	protected alive: boolean;

	protected deathDate: number;

	constructor(seat: number) {
		super();

		this.seat = seat;
		this.role = [];
		this.extraRoles = [];

		this.skills = [];

		this.alive = true;
		this.deathDate = 0;

		this.tags = new Set();
	}

	setRole(role: Role[]): void {
		this.role = role;
		this.emit('roleChanged', role);
	}

	addRole(role: Role): void {
		this.role.push(role);
		this.emit('roleChanged', this.role);
	}

	hasRole(role: Role): boolean {
		return this.role.includes(role);
	}

	getRole(): Role[] {
		return this.role;
	}

	hasTeamship(team: Team): boolean {
		return this.role.some((role) => Teamship.get(role) === team);
	}

	isAlive(): boolean {
		return this.alive;
	}

	setAlive(alive: boolean): void {
		this.alive = alive;
		this.emit('aliveChanged', alive);
	}

	addSkill(skill: Skill): void {
		this.skills.push(skill);
	}

	addTag(tag: string): void {
		if (!this.tags.has(tag)) {
			this.tags.add(tag);
			this.emit('tagChanged', this.tags);
		}
	}

	hasTag(tag: string): boolean {
		return this.tags.has(tag);
	}

	removeTag(tag: string): void {
		if (this.tags.delete(tag)) {
			this.emit('tagChanged', this.tags);
		}
	}
}

export default Player;
