<template>
  <div class="user-info-container">
    <div class="user-info-item">
      <span class="label">用户名</span>
      <span class="value">{{ userInfo.username }}</span>
      <el-button type="text" @click="changeNameDialogVisible = true" class="button-margin">更换用户名</el-button>
      <el-dialog title="修改用户名" :visible.sync="changeNameDialogVisible" width="30%" center>
        <el-form>
          <el-form-item label="请输入新用户名：">
            <el-input v-model="updateName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleChangeName">确 定</el-button>
          <el-button @click="cancleChangeName">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <hr class="divider" />
    <div class="user-info-item">
      <span class="label">手机号</span>
      <span class="value">{{ userInfo.phone }}</span>
      <el-button type="text" @click="changePhoneDialogVisible = true" class="button-margin">更换手机号</el-button>
      <el-dialog title="修改手机号" :visible.sync="changePhoneDialogVisible" width="30%" center>
        <el-input placeholder="请输入新手机号" v-model="updatePhone"></el-input>
        <div class="verification">
          <el-input placeholder="请输入验证码" v-model="verificationCode"></el-input>
          <el-button @click="getVerificationCode" :loading="countdown > 0">
            {{ countdown > 0? countdown : '获取验证码' }}
          </el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="Dialog-button" type="primary" @click="handleChangePhone">确 定</el-button>
          <el-button class="Dialog-button" @click="cancleChangePhone">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <hr class="divider" />
    <div class="user-info-item">
      <span class="label">照片</span>
      <span class="value">&nbsp;</span>
      <el-button type="text" @click="changePhotoDialogVisible = true" class="button-margin">更换照片</el-button>
      <el-dialog title="修改照片" :visible.sync="changePhotoDialogVisible" width="60%" center>
          <div class="video-container">
            <video ref="video" autoplay playsinline></video>
            <img  v-if="photoParameter.showingPicture" :src="photoParameter.imageUrl" alt="Displayed Image" />
          </div>
          <div class="button-container">
            <button @click="startCamera">启动摄像头</button>
            <button @click="stopCamera">关闭摄像头</button>
            <button v-if="!photoParameter.showingPicture" @click="captureImage">拍照</button>
            <button v-if="photoParameter.isCaptured" @click="submitImage">提交</button>
            <button v-if="photoParameter.showingPicture" @click="startAgain">重拍</button>
            <progress :value="photoParameter.uploadProgress" max="100" v-if="photoParameter.uploadProgress > 0"></progress>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleChangePhoto">确 定</el-button>
          <el-button @click="cancleChangePhoto">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="photo-container">
      <div class="photo-display">
        <img :src="userInfo.photo" alt="用户照片" v-if="userInfo.photo" />
        <div class="placeholder" v-else>照片显示</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInfo: {},
      isLoading: true,
      changeNameDialogVisible:false,
      changePhoneDialogVisible:false,
      changePhotoDialogVisible:false,
      photoParameter:{
        mediaStream: null,
        uploadProgress: 0,
        imageUrl:'',
        ImageFile:null,
        isCaptured:false,
        showingPicture:false,
        isCameraWorking:false
      },
      updateName:'',
      updatePhone:'',
      verificationCode:'',
      phoneReg:/^1[3-9]\d{9}$/,
      vercodeReg:/^\d{6}$/,
      nameReg:/^([\u4e00-\u9fa5]|\w){2,8}$/,
      countdown: 0,
      timer:null
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user-info');
        this.userInfo = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error('获取用户信息失败', error);
        this.isLoading = false;
      }
    },
    getVerificationCode() {
        if (!this.phoneReg.test(this.updatePhone)) {
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
    handleChangeName(){
      if(!this.nameReg.test(this.updateName)){
        this.$message.warning('请正确输入用户名！');
        return;
      }
      //调接口
      this.changeNameDialogVisible = false;
    },
    handleChangePhone() {
      if (!this.phoneReg.test(this.updatePhone)) {
        this.$message.warning('请正确填写手机号');
        return;
      }
      if(!this.vercodeReg.test(this.verificationCode)) {
        this.$message.warning('请正确填写验证码');
        return;
      }
      //调接口
      this.changePhoneDialogVisible = false;
    },
    handleChangePhoto() {
      this.resetPhotoParameter();
      this.changePhotoDialogVisible = false;
    },
    cancleChangeName(){
      this.updateName = '';
      this.changeNameDialogVisible = false;
    },
    cancleChangePhone(){
      this.updatePhone = '';
      this.verificationCode = '';
      this.changePhoneDialogVisible = false;
      console.log(this.updatePhone)
    },
    cancleChangePhoto(){
      this.resetPhotoParameter();
      this.changePhotoDialogVisible = false;
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
    
    async startCamera() {
            try {
                this.photoParameter.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.video.srcObject = this.photoParameter.mediaStream;
                this.$refs.video.play();
                this.photoParameter.isCameraWorking = true;
            } catch (error) {
                console.error('摄像头调用失败:', error);
            }
    },
        stopCamera() {
            if (this.photoParameter.mediaStream) {
                const tracks = this.photoParameter.mediaStream.getTracks();
                tracks.forEach(track => track.stop()); // 关闭所有媒体流跟踪
                this.photoParameter.mediaStream = null;
                this.$refs.video.srcObject = null; // 重置video元素
                this.photoParameter.isCameraWorking = false;
            }
        },
        startAgain(){
            this.photoParameter.ImageFile = null;
            this.photoParameter.isCaptured = false;
            this.photoParameter.showingPicture = false;
            this.startCamera();
        },
        beforeDestroy() {
            this.stopCamera(); // 页面销毁时自动关闭摄像头
        },
        showBlobImage(blobFile) {
            const objectUrl = URL.createObjectURL(blobFile);
            this.photoParameter.imageUrl = objectUrl;
        },
        // 拍照并转为文件
        async captureImage() {
            if(!this.photoParameter.isCameraWorking) {
                return;
            }
            const canvas = document.createElement("canvas");
            const video = this.$refs.video;// 等待视频元数据加载
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            //转换为blob
            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, "image/jpeg", 0.8); // 质量压缩至80%
            });
            const file = new File([blob], "capture.jpeg", { type: "image/jpeg" });
            this.photoParameter.ImageFile = file;
            this.photoParameter.isCaptured = true;
            this.photoParameter.showingPicture = true;
            this.stopCamera();
            
            // 回显照片到页面上
            try {
                const objectUrl = URL.createObjectURL(blob);
                this.photoParameter.imageUrl = objectUrl;
            } catch (error) {
                console.error('创建对象URL失败', error);
            }
        },
        async submitImage(){
            await this.uploadImage(this.photoParameter.ImageFile);
            this.photoParameter.showingPicture = false;
        },

        // 上传文件到后端
        async uploadImage(file) {
            const formData = new FormData();
            formData.append("image", file);
            console.log("上传文件到后端");
            try {
                const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    this.photoParameter.uploadProgress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100 
                    );
                },
                });
                console.log("上传成功", response.data);
            } catch (error) {
                console.error("上传失败", error);
            }
        },
        resetPhotoParameter(){
          this.photoParameter.mediaStream = null,
          this.photoParameter.uploadProgress = 0,
          this.photoParameter.imageUrl = '',
          this.photoParameter.ImageFile = null,
          this.photoParameter.isCaptured = false,
          this.photoParameter.showingPicture = false,
          this.photoParameter.isCameraWorking = false
        }
  }
};
</script>

<style scoped>
.user-info-container {
  padding: 20px;
  width: 600px;
  margin: 0 auto;
}

.user-info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  width: 100px;
  margin-right: 10px;
}

.value {
  flex: 1;
}

.button-margin {
  margin-left: 10px;
}

.photo-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.photo-display {
  width: 300px;
  height: 200px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder {
  color: #999;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.verification{
  display: flex;
  margin: 10px 0px;
}


.button-container {
    display: flex;
    flex-direction:row;
    justify-content: center;
    background-color: rgb(210, 228, 235);
    margin-left:40px;
    margin-right:40px;
}
.button-container button {
    width:auto;
    height:30px;
    margin-right: 3vh;
}
.el-container{
    display: flex;
}
.el-main{
    /*flex-grow: 1;*/
    width:80vh;
}
.video-container {
  text-align: center;
  height: 20vh;
  padding-bottom: 39.375%; /*根据16:9宽高比计算，50% * 9 / 16 ，保持视频比例 */
  position: relative;
    
}
.video-container video {
  width: 80vh;
  height: 45vh;
  object-fit: cover; /* 视频按比例缩放并裁剪以填满容器 */
}
.video-container img {
  width: 65vh;
  position: absolute;
  left:100px;
  object-fit: cover; /* 照片按比例缩放并裁剪以填满容器 */
}

</style>    