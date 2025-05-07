<template>
  <div class="task-container">
    <div class="filter-search">
      <el-radio-group v-model="filterStatus">
        <el-radio label="all">全部</el-radio>
        <el-radio label="incomplete">未完成</el-radio>
        <el-radio label="completed">已完成</el-radio>
      </el-radio-group>
      <el-input placeholder="搜索打卡任务" v-model="searchKeyword" suffix-icon="el-icon-search"></el-input>
    </div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(task, index) in filteredTasks" :key="index">
        <el-card class="task-card">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-time">{{ task.time }}</div>
          <div class="task-statistics">
            <span>应打卡数 {{ task.shouldCount }}</span>
            <span v-if="task.status === 'completed'">实打卡数 {{ task.actualCount }}</span>
            <span v-else>待打卡数 {{ task.shouldCount }}</span>
          </div>
          <div class="task-actions">
            <el-button type="text" @click="shareQrCode(task)">分享二维码</el-button>
            <el-button
              type="primary"
              @click="punchCard(task)"
              :disabled="task.status === 'completed'"
            >
              {{ task.status === 'completed' ? '已打卡' : '打卡' }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      filterStatus: 'all',
      searchKeyword: '',
      isLoading: true
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        if (this.filterStatus === 'all') {
          return true;
        } else if (this.filterStatus === 'incomplete' && task.status === 'incomplete') {
          return true;
        } else if (this.filterStatus === 'completed' && task.status === 'completed') {
          return true;
        }
        return false;
      }).filter(task => {
        return task.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT');
        this.tasks = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error('获取打卡任务列表失败:', error);
        this.isLoading = false;
      }
    },
    shareQrCode(task) {
      console.log(`分享${task.title}的二维码`);
    },
    punchCard(task) {
      console.log(`为${task.title}打卡`);
      if (task.status === 'incomplete') {
        task.status = 'completed';
        task.actualCount = task.shouldCount;
      }
    }
  }
};
</script>

<style scoped>
.task-container {
  padding: 20px;
}
.task-card {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}
.task-title {
  font-weight: bold;
  margin-bottom: 5px;
}
.task-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.task-statistics {
  margin-bottom: 10px;
}
.task-actions {
  text-align: right;
}
.filter-search {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.el-radio-group{
  display: flex;
  margin-right: 20px;
}
</style>    