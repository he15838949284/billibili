<template>
  <div @click="bannerClick">
      <div class="editbanner">
          <span>{{left}}</span>
          <span><slot name="right" /></span>
      </div>
  </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        bannerClick(){
            this.$emit('bannerClick')
        }
    }
}
</script>

<style lang="scss" scoped>
.editbanner{
    background: white;
    padding: 4.167vw;
    color: #333;
    font-size: 4.167vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>