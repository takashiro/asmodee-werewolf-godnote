enum GameEvent {
	Invalid,

	/**
	 * 游戏开始时
	 */
	Starting,

	/**
	 * 阶段改变时
	 */
	Ticking,

	/**
	 * 玩家濒死前
	 */
	BeforeDying,

	/**
	 * 玩家濒死时
	 */
	Dying,
}

export default GameEvent;
