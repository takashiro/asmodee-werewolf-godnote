import { Role } from '@asmodee/werewolf-core';

import type Collection from './Collection.js';
import type Player from './Player.js';
import type Skill from './Skill.js';

import Event from './Event.js';
import EventDriver from './EventDriver.js';
import Period from './Period.js';

class Board extends EventDriver<Event> {
	protected collections: Collection[] = [];

	protected players: Player[] = [];

	protected period = Period.Unknown;

	protected day = 0;

	setCollections(collections: Collection[]): void {
		this.collections = collections;
	}

	getCollections(): Collection[] {
		return this.collections;
	}

	setPlayers(players: Player[]): void {
		this.players = players;
	}

	getPlayers(): Player[] {
		return [...this.players];
	}

	getAlivePlayers(): Player[] {
		return this.players.filter((player) => player.isAlive());
	}

	getPlayer(seat: number): Player | undefined {
		return this.players[seat - 1];
	}

	getPeriod(): Period {
		return this.period;
	}

	isStarted(): boolean {
		return this.day > 0;
	}

	getDay(): number {
		return this.day;
	}

	giftPlayer(player: Player, role: Role): void {
		for (const col of this.getCollections()) {
			const SkillCreators = col.getSkills(role);
			if (!SkillCreators) {
				continue;
			}

			for (const SkillCreator of SkillCreators) {
				const skill = new SkillCreator(this, player);
				player.addSkill(skill);

				const effects = skill.getEffects();
				if (effects) {
					for (const effect of effects) {
						this.register(effect);
					}
				}
			}
		}
	}

	async start(): Promise<void> {
		for (const player of this.getPlayers()) {
			for (const role of player.getRole()) {
				this.giftPlayer(player, role);
			}
		}
		await this.trigger(Event.GameStarted);
		await this.sunset();
	}

	async tick(): Promise<void> {
		if (this.period === Period.Day) {
			await this.sunset();
		} else {
			await this.sunrise();
		}
	}

	async sunset(): Promise<void> {
		this.day++;
		await this.trigger(Event.BeforeSunset);
		this.period = Period.Night;
		await this.trigger(Event.AfterSunset);
	}

	async sunrise(): Promise<void> {
		await this.trigger(Event.BeforeSunrise);
		for (const player of this.players) {
			player.clearTags();
		}
		this.period = Period.Day;
		await this.trigger(Event.AfterSunrise);
	}

	getSkills(): Skill<unknown, Player>[] {
		return this.players.map((player) => player.getSkills()).flat(1);
	}

	isPeriodFinished(): boolean {
		for (const player of this.players) {
			for (const skill of player.getSkills()) {
				if (skill.getPeriod() === this.period && !skill.isFinished()) {
					return false;
				}
			}
		}
		return true;
	}
}

export default Board;
