<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-header class="big-middle-container">白鹿打卡</el-header>
        <el-container>
            <el-container>
                <el-aside width="200px" style="background-color:blue">
                    <el-header>个人中心</el-header>
                    <el-container>
                        <el-main>此处展示个人信息</el-main>
                        <el-footer>
                            <el-button v-if="this.$store.getters.getLoginState" @click="Signout()">注销登录</el-button>
                        </el-footer>
                    </el-container>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-aside width="200px" style="background-color:blue">

                    </el-aside>
                </el-container>
            </el-container>
            <el-footer style="background-color: red;">
                
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
console.log(111);
export default{
    data(){
        return {

        }
    },
    methods:{
        JumptoRegister(){
            console.log("跳转至注册视图");
            this.$router.push('/register');
        },
        JumptoLogin(){
            console.log("跳转至登录视图");
            this.$router.push('/login');
        },
        Signout(){
            this.$router.push('/home/login');
            this.$store.commit('Signout');
        }
    }
    
}
</script>
<style scoped>
.big-middle-container {
    display: flex;
    justify-content: center;
    height: 100vh;
    font-size: 70px;
    font-weight: bold;
    font-family:serif;
}
/*.middle{
    display: flex;
    flex-direction:column;
    justify-content: center;
}
.center-container{
    display: flex;
    align-items: center;
    
}*/
.el-main{
    height:75vh;
}
</style>