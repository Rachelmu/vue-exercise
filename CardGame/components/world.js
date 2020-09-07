// 城堡
Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
      <img class="building" :src="'svg/castle' + index + '.svg'" />
      <img class="ground" :src="'svg/ground' + index + '.svg'" />
      <castle-banners :player="player" />
    </div>`,
    props: ['player', 'index'],
})

/* --- STATS --- */

Vue.component('castle-banners', {
    template: `<div class="banners">
      <!-- 食物 -->
      <img class="food-icon" src="svg/food-icon.svg" />
      <!-- 小气泡 -->
      <bubble type="food" :value="player.food" :ratio="foodRatio" />
      <!-- 旗帜栏 -->
      <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />
  
      <!-- 生命值 -->
      <img class="health-icon" src="svg/health-icon.svg" />
      <!-- 小气泡 -->
      <bubble type="health" :value="player.health" :ratio="healthRatio" /> 
      <!-- 旗帜栏 -->
      <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
    </div>`,
    props: ['player'],
    computed: {
      foodRatio () {
        // 食物点数比例
        return this.player.food / maxFood
      },
      healthRatio () {
        // 计算生命值
        return this.player.health / maxHealth
      },
    }
  })