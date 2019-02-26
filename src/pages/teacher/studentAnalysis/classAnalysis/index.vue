<template>
  <div>
    <HeaderPublic :url_index=url_index></HeaderPublic>
    <div class="classAndSubject">
      <div class="classAndSubject-content">
        <div class="classAndSubject-content-panel">
          <ClassNav></ClassNav>
        </div>
        <div class="classAndSubject-content-wrapper">
          <div class="classAndSubject-content-wrapper-side">
            <SideNav></SideNav>
          </div>
          <div class="classAndSubject-content-wrapper-right">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassNav from "@/components/classNav";
import SideNav from "@/components/sideNav/leftNav.vue";
import HeaderPublic from "@/components/header";
export default {
  components: {
    ClassNav,
    SideNav,
    HeaderPublic
  },
  data() {
    return {
      url_index: 2,   //header下标
    };
  }
}
</script>
<style lang="stylus" src="./index.stylus"></style>

