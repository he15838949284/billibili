<template>
  <div class="btnparent" @click="registerClick">
      <div class="loginBtn">{{btntext}}</div>
  </div>
</template>

<script>
export default {
    props:['btntext'],
    methods: {
        registerClick(){
            this.$emit('registerSubmit')
        }
    },
}
</script>

<style lang="scss" scoped>
.btnparent{
    padding: 4.167vw 2.778vw;
    .loginBtn{
        height: 12.5vw;
        background: #ff9db5;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.444vw;
        border-radius: 6.25vw;
    }
}

</style>