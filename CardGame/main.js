new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id= "#app" :class="cssClass">
            <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
            
            <div class="world">
                <castle v-for="(player, index) in players" :player="player" :index="index" />
                <div class="land" />
                <div class="clouds">
                    <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
                </div>
            </div>

            <transition name="hand">
                <hand :cards="currentHand" v-if="!activeOverlay" @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd"/>
            </transition>

            <transition name="fade">
                <div class="overlay-background" v-if="activeOverlay" />
            </transition>

            <transition name="zoom">
                <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players" />
                </overlay>
            </transition>
        </div>
    `,
    data: state,
    created(){
        // this.testHand = this.createTestHead()
    },
    mounted(){
       beginGame()
    },
    computed: {
        cssClass(){
            return {
                'can-play': this.canPlay,
            }
        }
    },
    methods:{
        handlePlay(){
            console.log("You played a card!")
        },
        createTestHead(){
            const cards = []
            // 遍历获取卡牌的id
            const ids = Object.keys(cards)
            // 抽取5张卡牌
            for(let i= 0; i <5 ; i++){
                cards.push(this.testDrawCard())
            }
            return cards
        },
        testDrawCard(){
            // 使用ID随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            // 返回一张新的卡牌
            return {
                // 卡牌的唯一标识符
                uid: cardUid++,
                // 定义的id
                id: randomId,
                // 定义对象
                def: cards[randomId]
            }
        },
        // testPlayCard(card){
        //     // 将卡牌从玩家手牌中移除即可
        //     console.log('card')
        //     const index = this.testHand.indexOf(card)
        //     this.testHand.splice(index, 1)
        // },
        handlePlayCard(card){
            playCard(card)
        },
        handleCardLeaveEnd(){
            applyCard()
        },
        handleOverlayClose () {
            overlayCloseHandlers[this.activeOverlay]()
        },
    }
})

var overlayCloseHandlers = {
    'player-turn' () {
        if (state.turn > 1) {
            state.activeOverlay = 'last-play'
        } else {
            newTurn()
        }
    },
  
    'last-play' () {
        newTurn()
    },
    
    'game-over' () {
        // 重新加载游戏
        document.location.reload()
    },
}

// 窗口大小变化的处理
window.addEventListener('resize', ()=> {
    state.worldRatio = getWorldRatio
})


// Tween.js
requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

function beginGame(){
    state.players.forEach(drawInitialHand)
}

function playCard (card) {
    if (state.canPlay) {
      state.canPlay = false
      currentPlayingCard = card
  
      // Remove the card from player hand
      // 将卡牌从玩家手牌中移除
      const index = state.currentPlayer.hand.indexOf(card)
      state.currentPlayer.hand.splice(index, 1)
  
      // Add the card to the discard pile
      // 将卡牌放到弃牌堆里
      addCardToPile(state.discardPile, card.id)
    }
}

function applyCard () {
    const card = currentPlayingCard
  
    applyCardEffect(card)
  
    // Wait a bit for the player to see what's going on
    // 稍等一会，让玩家观察到发生了什么
    setTimeout(() => {
      // Check if the players are dead
      // 检查玩家是否“死亡”
      state.players.forEach(checkPlayerLost)
  
      if (isOnePlayerDead()) {
        endGame()
      } else {
        nextTurn()
      }
    }, 700)
}

// 下一回合
function nextTurn () {
    state.turn ++
    state.currentPlayerIndex = state.currentOpponentId
    state.activeOverlay = 'player-turn'
}

// 新的回合
function newTurn () {
    state.activeOverlay = null
    if (state.currentPlayer.skipTurn) {
      skipTurn()
    } else {
      startTurn()
    }
}

function skipTurn () {
    state.currentPlayer.skippedTurn = true
    state.currentPlayer.skipTurn = false
    nextTurn()
}
  
function startTurn () {
    state.currentPlayer.skippedTurn = false
     // 如果两名玩家都已经玩过一个回合
    if (state.turn > 2) {
        // Draw new card
        // 抽一张新的卡牌
        setTimeout(() => {
            state.currentPlayer.hand.push(drawCard())
            state.canPlay = true
        }, 800)
    } else {
        state.canPlay = true
    }
}
  
function endGame () {
    state.activeOverlay = 'game-over'
}