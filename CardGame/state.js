// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
// 应用状态结合
var state = {
  // World 世界
  worldRatio: getWorldRatio(),
  // TODO Other things
  // 游戏 当前回合数，从1开始计数
  turn: 1,
  // 玩家对象怼数组
  players: [
    {
      name: 'Anne of Cleves',
    },
    {
      name: 'William the Bald',
    }
  ],
  // 当前玩家在players数组中的索引,随机使用0或1来决定谁先行动
  currentPlayerIndex: Math.round(Math.random()),
  testHand: [], // 临时属性
  card: []
}
