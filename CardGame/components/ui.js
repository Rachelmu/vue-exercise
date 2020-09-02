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
    <div class="card" :class="'type-' + def.type">
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

})