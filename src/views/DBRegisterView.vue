<template>
    <div class="quick-login-container">
        <el-main>
            <div class="login-wrapper">
            <div class="login-form">
                <el-tabs v-model="activeTab" type="card" class="login-tabs">
                    <h3 class="center">注册账号</h3>
                    <el-form :model="form" @submit.native.prevent="handleSubmit">
                        <el-form-item>
                            <br><el-input v-model="form.username" placeholder="请输入2-8位用户名" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.usercode" placeholder="请输入4-12位密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.checkcode" placeholder="请再次输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.phoneNumber" placeholder="请输入手机号" prefix-icon="el-icon-phone-outline"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="15">
                                <el-col :span="14">
                                    <el-input v-model="form.verificationCode" placeholder="请输入验证码" prefix-icon="el-icon-lock-outline"></el-input>
                                </el-col>
                                <el-col :span="9">
                                    <el-button @click="getVerificationCode" :loading="countdown > 0">
                                        {{ countdown > 0? countdown : '获取验证码' }}
                                    </el-button>
                                </el-col>
                            </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="isLoading" @click="handleSubmit">立即注册</el-button>
                    </el-form-item>
                    </el-form>
                </el-tabs>
                <p class="register-link">已有账号？ <router-link to="/login">去登陆</router-link></p>
            </div>
            </div>
        </el-main>
        </div>
    </template>


<script>
//import request from '@/utils/request';
export default {
    data() {
        return {
        activeTab: 'quick-login',
        form: {
            phoneNumber: '',
            username: '',
            usercode: '',
            checkcode: '',
            verificationCode: ''
        },
        isLoading: false,
        countdown: 0,
        timer: null,
        codeReg:/^[a-zA-Z0-9_!?,.@#$%^&*+-=()[\]{}~:;'"`<>|/\\]{4,12}$/,
        phoneReg:/^1[3-9]\d{9}$/,
        vercodeReg:/^\d{6}$/,
        nameReg:/^([\u4e00-\u9fa5]|\w){2,8}$/
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.timer) {
        clearInterval(this.timer);
        }
    },
    methods: {
        handleSubmit() {
        if (!this.nameReg.test(this.form.username)) {
            this.$message.warning('请正确输入用户名！');
            return;
        }
        if (!this.codeReg.test(this.form.usercode)) {
            this.$message.warning('请正确输入密码！');
            return;
        }
        if(this.form.usercode !== this.form.checkcode){
            this.$message.warning('两次输入密码不一致！');
            return;
        }
        if (!this.phoneReg.test(this.form.phoneNumber)) {
            this.$message.warning('请正确填写手机号');
            return;
        }
        if(!this.vercodeReg.test(this.form.verificationCode)) {
            this.$message.warning('请正确填写验证码');
            return;
        }

        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.$message.success('注册成功');
        }, 500);
        },
        getVerificationCode() {
        if (!this.phoneReg.test(this.form.phoneNumber)) {
            this.$message.warning('请正确填写手机号');
            return;
        }
        this.countdown = 60;
        this.startCountdown();
        // 这里应调用后端接口发送验证码，以下为模拟
        setTimeout(() => {
            this.$message.success('验证码已发送');
        }, 1500);
        },
        startCountdown() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            if (this.countdown <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            } else {
            this.countdown--;
            }
        }, 1000);
        },
        goToScanLogin() {
        // 这里可添加跳转逻辑，目前先提示
        this.$message.info('暂未实现，敬请期待');
        },
        handleResize() {
        const logoImg = document.getElementById('logo-img');
        if (logoImg) {
            // 由于 CSS 已经实现按比例缩放，这里可不做额外处理
            // 可根据需求添加自定义缩放逻辑
        }
        }
    }
};
</script>



<style scoped>
.quick-login-container {
    height:630px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.login-form {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.login-tabs {
  margin-bottom: 5px;
}

.login-tabs >>>.el-tabs__header >>>.el-tab-pane {
  text-align: center; /* 使内部文本水平居中 */
}

.el-form-item {
  margin-bottom: 15px;
}

.el-form-item__label {
  color: #333;
  font-weight: 500;
}

.el-input__inner {
  height: 40px;
  line-height: 40px;
}

.el-button {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  margin: auto;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link a {
  color: #663399;
  text-decoration: underline;
}

.center{
    font-size: 20px;
    display: flex;
    justify-content: center;
}


</style>