<template>
    <div v-if="model" class="editViews">
        <div style="margin-bottom:2.778vw"><nav-bar></nav-bar></div>
        <div class="uploadfile">
            <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead" />
            <edit-banner left="头像">
                <img :src="model.user_img" alt="" slot="right" v-if="model.user_img" >
                <img src="@/assets/default.png" alt="" slot="right" v-else >
            </edit-banner>
        </div>
      
        <edit-banner left="昵称" @bannerClick="showa=!showa">
            <a href="javascript:;" slot="right">{{model.name}}</a>
        </edit-banner>
        <edit-banner left="账号">
            <a href="javascript:;" slot="right">{{model.username}}</a>
        </edit-banner>
        <edit-banner left="性别" @bannerClick="showc=!showc">
            <a href="javascript:;" slot="right">{{model.gender==1?"女":"男"}}</a>
        </edit-banner>
        <edit-banner left="个性签名" @bannerClick="showb=!showb">
            <a href="javascript:;" slot="right">{{model.user_desc}}</a>
        </edit-banner>

        <div class="editback" @click="$router.back()">返回个人中心</div>

        <van-dialog v-model="showa" title="昵称" show-cancel-button @confirm="confirmaClick" @cancel="content=''">
            <van-field v-model="content" autofocus />
        </van-dialog>

        <van-dialog v-model="showb" title="个性签名" show-cancel-button @confirm="confirmbClick" @cancel="content=''">
            <van-field v-model="content" type="textarea" autofocus />
        </van-dialog>

        <van-action-sheet v-model="showc" cancel-text="取消" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'
import EditBanner from '@/components/common/editBanner.vue'
export default {
    data() {
        return {
            model:{},
            showa:false,
            showb:false,
            showc:false,
            content:'',
            actions: [
                { name: '男' , val:0},
                { name: '女' , val:1}
            ]
        }
    },
    components:{
        NavBar,
        EditBanner
    },
    methods:{
        async selectUser(){
            const res=await this.$http.get('/user/'+localStorage.getItem('id'))
            this.model=res.data[0];
        },
        async afterRead(file){
            const formdata=new FormData();
            formdata.append('file',file.file)
            const res=await this.$http.post('/upload',formdata);
            this.model.user_img=res.data.url;
            this.UserUpdata();
        },
        async UserUpdata(){
            const res=await this.$http.post('/update/'+localStorage.getItem('id'),this.model);
            if(res.data.code==200){
                this.$msg.success('修改成功')
            }
        },
        confirmaClick(){
            this.model.name=this.content;
            this.UserUpdata();
            this.content='';
        },
        confirmbClick(){
            this.model.user_desc=this.content;
            this.UserUpdata();
            this.content='';
        },
        onSelect(data){
            this.model.gender=data.val;
            this.UserUpdata();
            this.showc=false;
        }
    },
    created(){
        this.selectUser();
    }
}
</script>

<style lang="scss" scoped>
.editViews{
    a{
        color: #333;
    }
    img{
        height: 12.778vw;
        width: 12.778vw;
        border-radius: 50%;
    }
}
.uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        opacity: 0;
        position: absolute;
    }
}
.editback{
    margin-top: 5.556vw;
    background: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 4.167vw 0;
    font-size: 5vw;
}
</style>