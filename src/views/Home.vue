<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o" /></div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
          <van-list v-model="item.loading" :immediate-check="false" :finished="item.finished" finished-text="我是有底线的" @load="onLoad">
            <div class="detailparent">
              <detail
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar";
import Detail from "@/views/Detail.vue";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    NavBar,
    Detail,
  },
  activated(){
    let newCat = JSON.parse(localStorage.getItem('newCat'))
    this.changeCategory(newCat);
    this.selectArticle();
  },
  methods: {
    async SelectCategory() {
      if(localStorage.getItem('newCat')) {
        return
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      this.selectArticle();
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished=false;
        item.loading=false;
        item.pagesize = 10;
        return item;
      });
      this.category = category1;
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading=false;
      if(res.data.length<categoryitem.pagesize){
        categoryitem.finished=true;
      }
    },
    onLoad(){
      const categoryItem=this.categoryItem();
      setTimeout(()=>{
        categoryItem.page+=1;
        this.selectArticle();
      },1000)
      
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
  },
  watch: {
    active() {
      this.selectArticle();
    },
  },
  created() {
    this.SelectCategory();
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
.categorytab{
  position: relative;
  .category-ico{
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}
</style>