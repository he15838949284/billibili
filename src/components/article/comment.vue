<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt />
          <img v-else src="@/assets/default.png" alt />
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo&&item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>匿名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class="publishs" @click="publishClick(item.comment_id)" >回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left:30px">
        <comment-item :commentChild="item.child" @PostPublish="publishClick" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "./commentItem";
export default {
  data() {
    return {
      commentList: null,
    };
  },
  components: {
    CommentItem,
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if(res.data){
        this.$emit('lengthselect',res.data.length)
      }
      this.commentList = this.changeComentData(res.data);
    },
    changeComentData(data) {
      function fn(temp) {
        let data1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            data1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return data1;
      }
      return fn(null);
    },
    publishClick(id){
      this.$emit('publishClick',id)
    }
  },
  created() {
    this.commentData();
  },
};
</script>

<style lang="scss">
.commentParent {
  padding: 2.778vw 2.778vw;
  > div {
    border-bottom: 0.278vw solid #e7e7e7;
  }
  .commentItem {
    display: flex;
    padding: 2.778vw 0;
    .userImg {
      margin-right: 2.778vw;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
    .commentContent {
      flex: 1;
      position: relative;
      p {
        font-size: 3.333vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.389vw;
      }
      div {
        font-size: 3.611vw;
      }
      .publishs{
        position: absolute;
        right: 0vw;
        color: red;
      }
    }
  }
}
</style>