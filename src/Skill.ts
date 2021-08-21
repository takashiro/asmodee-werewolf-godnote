class Skill<Owner> {
	protected readonly owner: Owner;

	constructor(owner: Owner) {
		this.owner = owner;
	}

	getOwner(): Owner {
		return this.owner;
	}
}

export default Skill;
