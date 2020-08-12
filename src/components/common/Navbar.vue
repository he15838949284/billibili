<template>
  <div class="navbar">
      <div class="logo" @click="$router.push('/')">
          <img src="@/assets/logo.png" alt="">
      </div>
      <div>
          <p>
              请输入内容
              <van-icon class="ipt-icon" name="search" />
          </p>
      </div>
      <div>
          <img :src="imgUrl" alt="" v-if="imgUrl" @click="$router.push('/userinfo')" >
          <img src="@/assets/default.png" alt="" @click="$router.push('/login')" v-else >
          <p>下载app</p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl:''
        }
    },
    async mounted() {
        if(localStorage.getItem('token')){
            const res=await this.$http.get('/user/'+localStorage.getItem('id'))
            this.imgUrl=res.data[0].user_img;
        }
    },
}
</script>

<style lang="scss" scoped>
.navbar{
    height: 12.5vw;
    background: white;
    display: flex;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30.556vw;
        img{
            width: 80%;
        }
    }
    div:nth-child(2){
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0 1.389vw;
        p{
            font-size: 3.333vw;
            line-height: 7.222vw;
            background: #f4f4f4;
            height: 7.222vw;
            position: relative;
            padding-left: 6.944vw;
            width: 90%;
            border-radius: 2.778vw;
            color: #aaa;
            .ipt-icon{
                position: absolute;
                left: 2.778vw;
                top:50%;
                transform: translate(0,-50%);
                color: #aaa;
            }
        }
    }
    div:nth-child(3){
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 6.667vw;
            height: 6.667vw;
        }
        p{
            padding: 1.389vw 2.778vw;
            margin: 0 2.222vw;
            background: #fb7299;
            color: white;
            border-radius: 0.833vw;
            font-size: 3.611vw;
        }
    }
    
}

</style>