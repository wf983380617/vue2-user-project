<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0 !important;
}
#app {
  font-family: 黑体;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-table th.el-table__cell.is-leaf {
  background: rgb(238, 241, 246);
  color: rgb(96, 98, 102);
}
*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/*滚动条滑块*/
*::-webkit-scrollbar-thumb {
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #cccccc;
}
/*滚动条轨道*/
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 6px;
  background: #fff;
}
</style>
