<template lang="html">
  <div class="test">
    <div class="wrapper">
      <div class="color-list">
        <div class="color-item diff">

        </div>
        <div
            class="color-item"
            :style="{background:color.text}"
            v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
            :key="color.text"
        >{{color.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [{
        text: 'Aquamarine'
      }, {
        text: 'Hotpink'
      }, {
        text: 'Gold'
      }, {
        text: 'Crimson'
      }, {
        text: 'Blueviolet'
      }, {
        text: 'Lightblue'
      }, {
        text: 'Cornflowerblue'
      }, {
        text: 'Skyblue'
      }, {
        text: 'Burlywood'
      }]
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({value}) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
  }
}
</script>

<style lang="scss" scoped>
.test{
  width: 100vw;
  height: 100vh;
  background: #567834;
  box-sizing: border-box;
  padding:100px;
  .wrapper{
    border:1px solid #eee;
    width: 100%;
    height: 100%;
    background: pink;
    .color-list{
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .color-item{
        width: 120px;
        height: 120px;
        text-align: center;
        margin: 20px;
        line-height: 120px;
        box-sizing: border-box;
        &.diff{
          background: #000;
        }
      }
    }
  }
}
</style>