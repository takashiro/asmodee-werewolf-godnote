import { Role } from '@asmodee/werewolf-core';

import EventDriver from '../util/EventDriver';

import Collection from './Collection';
import GameEvent from './GameEvent';
import Period from './Period';
import Player from './Player';
import Skill from './Skill';

const periods: Period[] = [
	Period.Evening,
	Period.Night,
	Period.Dawn,
	Period.Morning,
	Period.Day,
	Period.Dusk,
];

class Board extends EventDriver {
	protected collections: Collection[] = [];

	protected players: Player[] = [];

	protected skills: Skill[] = [];

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
				const skill = new SkillCreator(player);
				this.skills.push(skill);

				const effects = skill.getEffects();
				if (effects) {
					for (const effect of effects) {
						this.register(effect);
					}
				}
			}
		}
	}

	start(): void {
		for (const player of this.getPlayers()) {
			for (const role of player.getRole()) {
				this.giftPlayer(player, role);
			}
		}
		this.day++;
	}

	tick(): boolean {
		if (!this.isStarted()) {
			return false;
		}

		const cur = periods.indexOf(this.period);
		const next = cur + 1;
		if (next < periods.length) {
			this.period = periods[next];
		} else {
			[this.period] = periods;
			this.day++;
		}
		this.trigger(GameEvent.Ticking, this.period);
		return true;
	}
}

export default Board;
