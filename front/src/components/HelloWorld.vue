<template>
  <div class="hello">
    <label for="">用户名：<input type="text" ref="username"></label><br><br>
    <label for="">密 码：<input type="password" ref="password"><br>
    <span>{{msg}}</span></label><br>
    <a class="sub" @click="sub">提交</a>
  </div>
</template>

<script>
// import axios from 'axios'
import login from '@/api/login.js'

export default {
  name: 'HelloWorld',
  created() {
    login.login().then(res => {
      console.log(res)
    })
    // axios.get('/api/login').then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    sub: function () {
      login.check({username:this.$refs.username.value, password:this.$refs.password.value}).then(res => {
        console.log(res)
        if(res.data.login) {
          this.$router.push('/login')
        } else {
          this.msg = '账号或密码错误'
        }
      })
    }
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.sub {
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: skyblue;
    color: black;
    padding: 4px;
    transition: all .3s;
  }
  .sub:hover {
    background-color: orange;
    color: #fff;
  }
  span {
    color: red;
  }
</style>
