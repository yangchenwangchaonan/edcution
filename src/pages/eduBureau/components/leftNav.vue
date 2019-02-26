<template>
  <div class="left-nav">
    <div v-for="(menu,idx) in menuList"
         class="score_analysis" :class="{fold:menu.fold}"
         @click="toggleMenu(idx)">
      <div class="main_menu">
        <img :src="menu.icon">
        <span class="">{{menu.name}}</span>
        <img class="icon-arrow" ref="rotate" src="@/assets/images/ic_triangle.png">
      </div>

      <div class="sub_menu" :class="{fold:menu.fold}">
        <div v-for="(list,index) in menu.child"
             class="option" :class="{ active:list.path == curPath}"
             @click="switchPath(list.path,idx)">
          {{list.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "eduLeftNav",
    data() {
      return {
        curMainMenuIdx: 0,
        curPath: '',
        menuList: [
          {
            name: '成绩分析',
            icon: require('@/assets/images/ic_chengjifenxi.png'),
            fold: true,
            child: [
              {
                name: '成绩总览',
                path: "/eduBureau/achievementAnalysis/generalPandect",
              },
              {
                name: '上线分析',
                path: "/eduBureau/achievementAnalysis/onlineAnalysis",
              }
            ]
          },
          {
            name: '试卷质量',
            icon: require('@/assets/images/ic_shijuanjiangping.png'),
            fold: true,
            child: [
              {
                name: '整体质量',
                path: "/eduBureau/overallQuanlity",
              },
              {
                name: '小题质量',
                path: "/eduBureau/questionsQuality/questionsQuality",
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this.examInfo = this.$route.query;
      this.curPath = this.$route.path;

      this.menuList.forEach((mainMenu, idx) => {
        mainMenu.child.forEach((subMenu) => {
          if (subMenu.path == this.curPath) {
            this.curMainMenuIdx = idx;
            this.menuList[idx].fold = false;
          }
        })
      })
    },
    methods: {
      toggleMenu(menuIdx) {
        this.menuList[menuIdx].fold = !this.menuList[menuIdx].fold;
        console.log(menuIdx)
      },
      switchPath(path, menuIdx) {
        this.$router.push({
          path: path,
          query: {
            //changeactive: index
          }
        });
        this.menuList[menuIdx].fold = false;
      }
    }
  };
</script>

<style scoped>
  .left-nav{
    width: 176px;
    background-color: #ffffff;
    height: 100%;
  }
  .score_analysis {
    border-radius: 6px;
    padding-bottom: 10px;
  }

  .main_menu {
    cursor: pointer;
    height: 41px;
  }

  .main_menu img {
    margin: 5px 8px 0px 14px;
  }

  .main_menu span {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #383B57;
  }

  .score_analysis_two {
    margin-top: 5px;
    width: 176px;
    height: 41px;
    background-color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
  }

  .icon-arrow{
    transform: rotate(180deg);
  }
  .sub_menu.fold {
    display: none;
  }
  .fold .icon-arrow{
    transform: rotate(0deg);
  }

  .sub_menu .option {
    width: 176px;
    height: 41px;
    text-align: center;
    line-height: 41px;
    background-color: #ffffff;
    cursor: pointer;
  }

  .sub_menu .option.active {
    background-color: #4B70FF;
    color: #ffffff;
  }
</style>
