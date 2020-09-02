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