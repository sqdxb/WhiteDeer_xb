<template>
    <div class="user-view-container">
      <el-row>
        <!-- 左侧导航栏 -->
        <el-col :span="6">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical-demo"
            @select="handleMenuSelect"
          >
            <el-menu-item index="checkin">我的打卡</el-menu-item>
            <el-menu-item index="join-team">加入团队</el-menu-item>
            <el-menu-item index="my-team">我的团队</el-menu-item>
            <el-menu-item index="personal-info">个人信息</el-menu-item>
          </el-menu>
        </el-col>
        <!-- 右侧内容展示区域 -->
        <el-col :span="18">
          <component :is="currentComponent"></component>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import MyCheckin from './MyCheckinView.vue';
  import JoinTeam from './JoinTeamView.vue';
  import MyTeam from './MyTeamView.vue';
  import PersonalInfo from './MyInfoView.vue';
  
  export default {
    name: 'UserView',
    data() {
      return {
        activeMenu: 'checkin',
        currentComponent: MyCheckin
      };
    },
    methods: {
      handleMenuSelect(key) {
        switch (key) {
          case 'checkin':
            this.currentComponent = MyCheckin;
            break;
          case 'join-team':
            this.currentComponent = JoinTeam;
            break;
          case 'my-team':
            this.currentComponent = MyTeam;
            break;
          case 'personal-info':
            this.currentComponent = PersonalInfo;
            break;
          default:
            this.currentComponent = MyCheckin;
        }
        this.activeMenu = key;
      }
    }
  };
  </script>
  
  <style scoped>
  .user-view-container {
    padding: 20px;
  }
  </style>