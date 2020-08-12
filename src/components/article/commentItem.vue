<template>
  <div class="commentitems">
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
			<div class="userImg">
				<img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt />
				<img v-else src="@/assets/default.png" alt />
				<p>
					<span v-if="item.userinfo&&item.userinfo.name">{{item.userinfo.name}}</span>
          <span v-else>匿名</span>
					<span>{{item.comment_date}}</span>
				</p>
			</div>
			<div class="commentContent">
				<div v-if="!temp">{{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)" >回复</span> </div>
				<div v-else>回复<span style="color:#478ef0">{{item.parent_user_info.name}}</span>:{{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span></div>
			</div>
      <div>
        <commentchild-item :commentChild="item.child" @postChild="postChild" :temp="true" />
      </div>
		</div>
  </div>
</template>

<script>
export default {
  name:'commentchildItem',
  props:['commentChild','temp'],
  methods: {
    PostItemcomment(id){
      this.$emit('postChild',id)
      this.$emit('PostPublish',id)
    },
    postChild(id){
      this.PostItemcomment(id)
      this.$emit('PostPublish',id)
    }
  },
};
</script>

<style lang="scss">
.commentitems{
  .commentItem{
    display: flex;
    flex-direction: column;
    .userImg{
      display: flex;
      margin: 0 1.389vw 2.778vw;
      img{
        margin-right: 2.778vw;
      }
      p {
        flex:1;
        font-size: 3.333vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.389vw;
      }
    }
    .commentContent{
      position: relative;
      margin-bottom: 2.778vw;
      .publish{
        position: absolute;
        right: 4.167vw;
        color: red;
      }
    }
  }
}
</style>