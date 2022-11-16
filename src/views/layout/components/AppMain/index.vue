<template>
  <div class="app-main">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "fade-transformLeft"
    };
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  height: calc(100vh - 140px);
  overflow: auto;
  .fade-transformLeft-leave-active,
  .fade-transformLeft-enter-active {
    transition: all 0.3s ease-in;
  }

  .fade-transformLeft-enter {
    opacity: 0;
    transform: translateX(-50%);
  }

  .fade-transformLeft-leave-to {
    opacity: 0;
    transform: translateX(50%);
  }

  .fade-transformRight-leave-active,
  .fade-transformRight-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-transformRight-enter {
    opacity: 0;
    transform: translateX(50%);
  }

  .fade-transformRight-leave-to {
    opacity: 0;
    transform: translateX(-50%);
  }
}
</style>