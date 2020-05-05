<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p id="p">
     <el-tabs type="border-card">
      <el-tab-pane label="登录" class="login">
        <el-input placeholder="请输入账号" v-model="account" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        <el-button type="primary" class="button"  @click="login">登录</el-button>
      </el-tab-pane>
      <el-tab-pane label="注册" class="register">
        <el-input placeholder="昵称" v-model="Account" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="PassWord" show-password></el-input>
        <el-input placeholder="请确认输入密码" v-model="AgainPassWord" show-password></el-input>
        <el-button type="primary" class="button" @click="register">注册</el-button> 
      </el-tab-pane>
     </el-tabs>
  </p>
  </div>
</template>
<script>
  export default {
    name: 'About',
    created(){
        document.title = '登录'
      },
    data() {
        return {
          account: '',
          password: '',
          Account: '',
          PassWord: '',
          AgainPassWord: ''
        }
      },
    methods:{
        login(){
         if(this.account =='' && this.password == ''){
              this.$message({
                  showClose: true,
                  message: '账号或密码不能为空',
                  type: 'warning',
                  center: true
              })
         }else if(this.account === '' && this.password !== ''){
               this.$message({
                 message: '账号不能为空',
                 type: 'warning',
                 center: true
              })
         }else if(this.account !== '' && this.password == ''){
               this.$message({
                 message: '密码不能为空',
                 type: 'warning',
                 center: true
               })
         }else{     
           this.$axios({
             method: 'get',
             url: '/login',
          }).then(res => {
          
            // 遍历后台传过来的数据 
            res.data.some((value,i) => {
              //  console.log(i,value)
              if(this.account === (i,value).UserName && this.password === (i,value).PassWord){ 
                 this.$router.push('./cart');
                  this.$message({
                    showClose: true,
                    message: '恭喜你，登录成功',
                    type: 'success',
                    center: true,
                    duration: 800,                                 
                 });
                 this.$message.error(false)    
                 return true;
                                                                    
                }
                                           
             })
            for(var i = 0; i < res.data.length; i++){
               if(this.account !== res.data[i].UserName || this.password !== res.data[i].PassWord){               
                  this.$message({
                     message: '登录失败',
                     type: 'error',
                     center: true,
                     duration: 800,
                     customClass: 'error'
                  })                
                  break;
               }
            }
                                            
          }).catch(error =>{
             console.log(error)
          })
         }
        },
        // 注册
        register(){
          if(this.Account === '' && this.PassWord === ''){
            this.$message({
              message: '账号和密码不能为空',
              type: 'warning',
              center: true
            })
          }else if(this.Account !== '' && this.PassWord === '' || this.AgainPassWord === ''){
            this.$message({
              message: '密码不能为空',
              type: 'warning',
              center: true
            })
          }else if(this.Account === '' && this.PassWord !== ''){
            this.$message({
              message: '账号不能为空',
              type: 'warning',
              center: true
            })
          }else if(this.PassWord !== this.AgainPassWord){
            this.$message({
              message: '请保持两次输入的密码一致',
              type: 'warning',
              center: true
            })
          }else{
         this.$axios({
              method: 'get',
              url: '/login',
              async: false             
            }).then(res =>{
              try{
                res.data.forEach((value) => {                 
                   if(this.Account === value.UserName){
                      this.$message({
                         message: '注册失败,账号已存在',
                         type: 'error',
                         duration: 800,
                         center: true
                      })
                      // console.log(value.UserName)
                      throw new Error("breakForEach");
                   }
                })
              } catch (e){
                 if ( e.message == 'breakForEach') throw e;
                }
              try{
                res.data.forEach((value) => {
                   if(this.Account !== value.UserName){
                      this.$axios({
                         method: 'post',
                         url: '/register',
                         data: {
                           Account: this.Account,
                           PassWord: this.PassWord
                         }
                      }).then(res => {
                         console.log(res)
                      this.$message({
                         message: '注册成功',
                         type: 'success',
                         duration: 800,
                         center: true
                      })
                      })
                      // console.log(value.UserName)
                      throw new Error("breakForEach");
                   }
                })
              } catch (e){
                 if ( e.message !== 'breakForEach') throw e;
              }  
              
            })
           }
          }
        }
    }

</script>
<style>
  #p{
     width: 30%;
     margin: auto;
  }
  .login{
     width: 100%;
     height: 200px;
     display: flex;
     flex-wrap: wrap;
     align-content: space-between;
  }
  .register{
     width: 100%;
     height: 200px;
     display: flex;
     flex-wrap: wrap;
     align-content: space-between;
  }
  .button{
     width: 100%;
  }
</style>