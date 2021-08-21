enum GameEvent {
	Invalid,

	// 游戏开始时
	Start,

	// 夜晚
	Evening,
	// 夜间
	Night,
	// 天亮前
	Dawn,

	// 早晨
	Morning,
	// 白天
	Day,
	// 天黑前
	Dusk,

	// 死亡前
	Killed,
	// 死亡时
	Death,
}

export default GameEvent;
