<template>
  <div class="userinfo">
      <nav-bar />
      <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
      <user-detail :userInfo="model"></user-detail>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue';
import UserDetail from '@/components/userComponent/userDetail.vue'
export default {
    data() {
        return {
            model:{}
        }
    },
    components:{
        NavBar,
        UserDetail
    },
    methods:{
        async UserinfoData(){
            const res=await this.$http.get('/user/'+localStorage.getItem('id'))
            this.model=res.data[0];
        }
    },
    created(){
        this.UserinfoData();
    }
}
</script>

<style lang="scss" scoped>
.userinfo{
    .backImg{
        height: 36.389vw;
    }
}
</style>