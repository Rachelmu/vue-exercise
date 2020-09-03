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
            <transition-group name="card" tag="div" class="cards">
                <card v-for="card of cards" :def="card.def" @play="handlePlay(card)" :key="card.id"/>
            </transition-group>
        </div>
    </div>
    `,
    props: ['cards'],
    methods: {
        handlePlay(){
            console.log('12')
            this.$emit('card-play', card)
        }
    }
})