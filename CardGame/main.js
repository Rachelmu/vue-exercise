new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id= "#app">
           <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
        </div>
    `,
    data: state,
    mounted(){
        console.log(this.$data === state)
    }
})

// 窗口大小变化的处理
window.addEventListener('resize', ()=> {
    state.worldRatio = getWorldRatio
})