<template>
    <div class="register">
    <h1 class="middle">注册新账号</h1>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="请输入账号" prop="account">
            <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="checkPass">
            <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">注册</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
            <el-button @click="JumpToLogin()">去登录</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
console.log(333);
    export default {
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入8位以内用户名'));
            }
            if (value.length > 8) {
                callback(new Error('用户名不可超过8个字符'));
            }
            else {
                callback();
            }
        };
        var validateAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入8位数字账号'));
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
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.pass) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
        };
        return {
        loginForm: {
            name:'',
            account:'',
            pass: '',
            checkPass: '',
            
        },
        rules: {
            name:[
                {validator:validateName,trigger: 'blur'}
            ],
            account:[
                {validator:validateAccount,trigger: 'blur'}
            ],
            pass: [
            { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
            { validator: validatePass2, trigger: 'blur' }
            ],
        }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            alert('submit!');
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
        JumpToLogin(){
            this.resetForm("loginForm");
            console.log("跳转至登录视图");
            this.$router.push('/home/login');
        }
    }
    }


</script>

<style scoped>

.middle{
    display: flex;
    justify-content: center;
}
.demo-loginForm{
    width:400px;
    height:300px;
}
.register{
    margin:10vh;
}

</style>