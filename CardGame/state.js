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
      // 游戏开始时的状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上个回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false
    },
    {
      name: 'William the Bald',
      // 游戏开始时的状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上个回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false
    }
  ],
  // 当前玩家在players数组中的索引,随机使用0或1来决定谁先行动
  currentPlayerIndex: Math.round(Math.random()),
  testHand: [], // 临时属性
  // 用户界面
  activeOverlay: null,
  // 返回player对象
  get currentPlayer(){
    return state.players[state.currentPlayerIndex]
  },
  // 返回对手player的索引
  get currentOpponentId(){
    return state.currentPlayerIndex === 0 ? 1 : 0
  },
  // 返回相应的player对象
  get currentOpponent(){
    return state.players[state.currentOpponentId]
  },
  // 手牌
  get currentHand () {
    return state.currentPlayer.hand
  },
  // 玩家可以抽牌的牌堆
  drawPile: pile,
  // 弃牌堆
  discardPile: {},
  // 防止重复出牌
  canPlay: false
}
