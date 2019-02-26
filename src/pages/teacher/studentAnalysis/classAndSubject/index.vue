<template>
  <div>
    <HeaderPublic :url_index=url_index></HeaderPublic>
    <div class="classAndSubject">
      <div class="classAndSubject-content">
        <div class="classAndSubject-content-panel">
          <ClassNav></ClassNav>
        </div>
        <div class="classAndSubject-content-wrapper">
          <div ref="sideNav" class="classAndSubject-content-wrapper-side">
            <SideNav v-model="activeNav" :sideNavList="sideNavList"></SideNav>
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
import ClassNav from "@/components/headerTitle";
import SideNav from "@/components/sideNav/sideNav.vue";
import HeaderPublic from "@/components/header";
export default {
  components: {
    ClassNav,
    SideNav,
    HeaderPublic
  },
  data() {
    return {
      url_index: 2,  //header下标
      sideNavList: [
        {
          label: '教学质量',
          id: '1',
          iconClass: 'sideNav-grade',
          to: '',
          children: [
            {
              label: '班级总体分析',
              to: '/teacher/classAndSubject/classAnalysis',
              id: '11'
            },
            {
              label: '学生分析',
              to: '/teacher/classAndSubject/subjectAnalysis',
              id: '12'
            }
          ]
        },
        {
          label: '备课',
          id: '2',
          iconClass: 'sideNav-beike',
          to: '/teacher/lessonPreparation'
        }
      ],
      activeNav: ''
    };
  },
  beforeMount() {
    this.activeNav = this.$route.path;
  }
}
</script>
<style lang="stylus" src="./index.stylus"></style>

