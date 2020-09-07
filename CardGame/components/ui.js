Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-'+currentPlayerIndex">
        <div class="player p0"> {{ players[0].name }} </div>
        <div class="turn-counter">
            <div class="turn">Turn {{ turn }} </div>
        </div>
        <div class="player p1"> {{ players[1].name }} </div>
    </div>`,
    props: ['players', 'currentPlayerIndex', 'turn'],
})

// 卡片组件
Vue.component('card', {
    template: `
    <div class="card" :class="'type-' + def.type" @click="play">
        <div class="title">{{ def.title }} </div>
        <img class="separator" src="svg/card-separator.svg" />
        <div class="description">
            <div v-html="def.description"></div>
        </div>
        <div class="note" v-if="def.note">
            <div v-html="def.note"></div>
        </div>
    </div>
    `,
    props: ['def'],
    methods: {
        play(){
            console.log('31')
            this.$emit('play')
        }
    }
})

// 手牌
Vue.component('hand', {
    template: `
    <div class="hand">
        <div class="wrapper">
            <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
                <card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
            </transition-group>
        </div>
    </div>
    `,
    props: ['cards'],
    methods: {
        handlePlay(){
            console.log('12')
            this.$emit('card-play', card)
        },
        handleLeaveTransitionEnd () {
            this.$emit('card-leave-end')
        },
    }
})

/* --- OVERLAYS --- */
// 插槽
Vue.component('overlay', {
    template: `
        <div class="overlay" @click="handleClick">
            <div class="content">
                <slot />
            </div>
        </div>
    `,
    methods: {
        handleClick(){
            this.$emit('close')
        }
    }
})

// player-turn
Vue.component('overlay-content-player-turn', {
    template: `
        <div>
            <div class="big" v-if="player.skipTurn"> {{ player.name }},
            <br> your turn is skipped! </div>
            <div class="big" v-else> {{player.name}},
            <br> your turn has come! </div>
            <div> Tap to continue </div>
        </div>
    `,
    props: ['player']
})

// last-play
Vue.component('overlay-content-last-play',{
    template: `
        <div>
            <div v-if="opponent.skippedTurn">{{ opponent.name }} turn was skippedTurn! </div>
            <template v-else>
                <div> {{ opponent.name }} just played: </div>
                <card :def="lastPlayedCard" />
            </template>
        </div>
    `,
    props: ['opponent'],
    computed: {
        lastPlayCard(){
            return getLastPlayedCard(this.opponent)
        }
    }
})

// game-over
Vue.component('overlay-content-game-over', {
    template: `<div>
      <div class="big">Game Over</div>
      <player-result v-for="player in players" :player="player" />
    </div>`,
    props: ['players'],
})
  
Vue.component('player-result', {
template: `<div class="player-result" :class="result">
    <span class="name">{{ player.name }}</span> is
    <span class="result">{{ result }}</span>
</div>`,
props: ['player'],
computed: {
    result () {
    return this.player.dead ? 'defeated' : 'victorious'
    },
},
})
function getLastPlayedCard(player){
    return cards[player.lastPlayCardId]
}