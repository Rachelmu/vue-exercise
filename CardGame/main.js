new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id= "#app">
           <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
           <card :def="testCard" @play="handlePlay"/>
        </div>
    `,
    data: state,
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
        }
    }
})

// 窗口大小变化的处理
window.addEventListener('resize', ()=> {
    state.worldRatio = getWorldRatio
})