new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id= "#app">
            <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
            <transition name="hand">
                <hand :cards="testHand" v-if="!activeOverlay"/>
            </transition>
            <div class="wrapper">
                
            </div>
        </div>
    `,
    data: state,
    created(){
        this.testHand = this.createTestHead()
    },
    mounted(){
        console.log(this.$data === state)
    },
    computed: {
        testCard(){
            return cards.archers
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
        }
    }
})

// 窗口大小变化的处理
window.addEventListener('resize', ()=> {
    state.worldRatio = getWorldRatio
})