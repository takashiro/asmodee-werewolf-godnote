
class Skill {

	constructor(timing, role) {
		this.timing = timing;
		this.role = role;
		this.priority = 0;
	}

	belongsTo(player) {
		return player.hasRole(this.role);
	}

}

export default Skill;
