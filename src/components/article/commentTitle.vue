<template>
  <div class="comment">
      <p class="comment-title">
          <span>评论</span>
          <span>{{dataLength}}</span>
      </p>
      <div class="commentMyinfo">
          <img :src="myuser.user_img" alt="" v-if="myuser.user_img">
          <img src="@/assets/default.png" alt="" v-else>
          <input v-model="comcontent" ref="Postipt" type="text" placeholder="说点什么啊">
          <button @click="commentPublish">发表</button>
      </div>
  </div>
</template>

<script>
export default {
    props:['dataLength'],
    data() {
        return {
            myuser:{},
            comcontent:''
        }
    },
    methods: {
        async myUserinfo(){
            const res=await this.$http.get('/user/'+localStorage.getItem('id'));
            this.myuser=res.data[0];
        },
        commentPublish(){
            if(!this.myuser&&!localStorage.getItem('token')&&!localStorage.getItem('id')){
                this.$msg.fail('请先登录')
                return
            }
            this.$emit('Postcomment',this.comcontent);
            this.comcontent='';
        },
        focusIpt(){
            this.$refs.Postipt.focus()
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.myUserinfo();
        }
    }
}
</script>

<style lang="scss" scoped>
.comment{
    padding: 8.333vw 2.778vw 0 2.778vw;
    .comment-title{
        span:nth-child(2){
            color:#aaa;
            margin-left: 2.778vw;
        }
    }
    .commentMyinfo{
        padding: 2.778vw 0;
        display: flex;
        align-items: center;
        img{
            height: 7.944vw;
            width: 7.944vw;
            border-radius: 50%;
        }
        input{
            outline: none;
            border: 0;
            background: #f4f4f4;
            border-radius: 3.611vw;
            padding: 0 5.556vw 0 4.167vw;
            margin-left: 2.778vw;
        }
        button{
            outline: none;
            border: 0;
            border-radius: 3.333vw;
            background: #fb7299;
            color: white;
            padding: 0 4.167vw;
        }
    }
}
</style>