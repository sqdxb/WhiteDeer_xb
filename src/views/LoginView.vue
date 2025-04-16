<template>
    <div class="login">
    <h1 class="middle">登录账号</h1>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">账号密码登录</el-menu-item>
                <el-menu-item index="2">手机号登录</el-menu-item>
                <el-menu-item index="3">二维码登录</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="90px" class="demo-loginForm">
                <el-form-item label="请输入账号" prop="account">
                    <el-input v-model="loginForm.account"></el-input>
                </el-form-item>
                <el-form-item label="请输入密码" prop="pass">
                    <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                    <el-button @click="JumpToRegister()">去注册</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
        
    </div>
</template>

<script>
console.log(222);
    export default {
    data() {
        var validateAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入账号'));
            }
            else if (isNaN(Number(value))) {
                callback(new Error('请输入有效的数字值'));
            }
            else if (value.length !== 8) {
                callback(new Error('账号长度应为8'));
            }
            else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
            }
            callback();
        }
        };
        return {
        loginForm: {
            account:'',
            pass: '',
            activeIndex:'1'
        },
        rules: {
            account:[
                {validator:validateAccount,trigger: 'blur'}
            ],
            pass: [
            { validator: validatePass, trigger: 'blur' }
            ],
        }
        };
    },
    methods: {
        UserLogin(){
            this.$router.push('/home/user');
            this.$store.commit('Login');
            console.log("跳转至用户视图");
        },
        ManagerLogin(){
            this.$router.push('/home/manager');
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //传账号密码给后端
            //alert('submit!');
            //根据后端返回身份信息选择跳转视图
            this.UserLogin();
            } else {
            console.log('error submit!!');
            return false;
            }
        });
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(1);
        },
        JumpToRegister(){
            this.resetForm("loginForm");
            this.$router.push('/home/register');
        }
    }
    }


</script>

<style>

.middle{
    display: flex;
    justify-content: center;
}
.login{
    margin:10vh;
    width: 60vh;
}
</style>