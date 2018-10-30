<template>
  <div class="Element">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        
        <el-table
          :data="arr[idx]"
          height="250"
          style="width: 100%">
          <el-table-column
            prop="create_time"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :page-size="pagesize"
          :total="newArr.length"
          @prev-click="prevClick"
          @next-click="nextClick"
          @current-change="currentChange"
          >
        </el-pagination>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Element',
    data() {
      return {
        arr: [],
        newArr: [],
        idx: 0,
        pagesize: 5
      }
    },
    methods: {
      toChangeTime(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
      },
      toChangeNum(rs){
        var arr = []
        var i = 0;
        let that = this
        rs.forEach(function(item, index) {
            if (!arr[i]) {
                arr[i] = [];
            }
            arr[i].push(item)
            if ((index + 1) % that.pagesize == 0) {
                i++;
            }
        })
        return arr;
      },
      getAlldata() {
        var opts = {
          method:"POST",   //请求方法
          body:JSON.stringify({}),   //请求体
　　　　　 headers: {
            'Accept': 'application/json',
    　　　　 'Content-Type': 'application/json'
  　　　　 },
        }
        fetch('/apc/element',opts)
        .then(res=>res.json())
        .then(body => {
          body.forEach(item=>{
            item.create_time = this.toChangeTime(item.create_time*1)
          })
          console.log(body)
          this.newArr = body
          this.arr = this.toChangeNum(body)
          console.log(this.arr)
        })
      },
      prevClick(){
        this.idx--
      },
      nextClick(){
        this.idx++
      },
      currentChange(e){
        this.idx = e-1
      }
    },
    mounted() {
      this.getAlldata()
    },
  }
</script>

<style lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>