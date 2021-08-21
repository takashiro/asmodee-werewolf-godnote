import { EventEmitter } from 'events';
import {
	Role,
	Team,
	Teamship,
} from '@asmodee/werewolf-core';

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

	emit(event: 'roleChanged', role: Role[]): boolean;
	emit(event: 'aliveChanged', alive: boolean): boolean;
	emit(event: 'tagChanged', tags: string[]): boolean;
}

class Player extends EventEmitter {
	protected seat: number;

	protected role: Role[];

	protected tags: Set<string> = new Set();

	protected alive = true;

	protected deathDate?: number;

	constructor(seat: number, role: Role[] = []) {
		super();

		this.seat = seat;
		this.role = role;
	}

	setRole(role: Role[]): void {
		this.role = role;
		this.emit('roleChanged', role);
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

	addTag(tag: string): boolean {
		if (this.tags.has(tag)) {
			return false;
		}
		this.tags.add(tag);
		this.emit('tagChanged', [...this.tags]);
		return true;
	}

	hasTag(tag: string): boolean {
		return this.tags.has(tag);
	}

	removeTag(tag: string): boolean {
		if (!this.tags.delete(tag)) {
			return false;
		}
		this.emit('tagChanged', [...this.tags]);
		return true;
	}
}

export default Player;
