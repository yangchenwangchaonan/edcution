<template>
  <div class="left-nav">
    <div v-for="(menu,idx) in menuList"
         class="score_analysis" :class="{fold:menu.fold}"
         :key="idx"
         @click="toggleMenu(idx)">
      <div class="main_menu" :class="{ active:menu.path == curPath}" @click="switchMainPath(menu.path)">
        <div class="icon_left">
          <img :src="menu.path == curPath?menu.activeIcon:menu.icon">
        </div>
        <span class="">{{menu.name}}</span>
        <div class="icon_right">
          <img v-if="!menu.path" class="icon-arrow" ref="rotate" src="@/assets/images/ic_triangle.png">
        </div>
      </div>

      <div class="sub_menu" :class="{fold:menu.fold}">
        <div v-for="(list,index) in menu.child"
             class="option" :class="{ active:list.path == curPath}"
             :key="index"
             @click="switchPath(list.path,idx)">
          {{list.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeacherLeftNav",
    data() {
      return {
        curMainMenuIdx: 0,
        curPath: '',
        menuList: [
          {
            name: '教学质量',
            icon: require('@/assets/images/ic_chengjifenxi.png'),
            fold: true,
            child: [
              {
                name: '班级总体分析',
                path: "/teacher/classAndSubject/classAnalysis",
              },
              {
                name: '学生分析',
                path: "/teacher/classAndSubject/subjectAnalysis",
              }
            ]
          },
          {
            name: '备课',
            icon: require('@/assets/images/ic_beike.png'),
            activeIcon: require('@/assets/images/ic_beike_white.png'),
            path: '/teacher/lessonPreparation',
            fold: true
          }
        ]
      }
    },
    mounted() {
      this.examInfo = this.$route.query;
      this.curPath = this.$route.path;

      this.menuList.forEach((mainMenu, idx) => {
        mainMenu.child && mainMenu.child.forEach((subMenu) => {
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
      switchMainPath(path) {
        if (path) {
          this.$router.push({
            path: path,
            query: {
              //changeactive: index
            }
          });
        }
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
  .left-nav {
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
    color: #383B57;
    display: flex;
    align-items: center;
  }

  .main_menu.active {
    background-color: #4B70FF;
    color: #ffffff;
  }

  .main_menu img {
    margin-right: 8px;
  }

  .main_menu > span {
    display: inline-block;
    vertical-align: middle;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    flex: 1;
  }

  .main_menu .icon_left {
    width: 60px;
    text-align: center;
  }

  .score_analysis_two {
    margin-top: 5px;
    width: 176px;
    height: 41px;
    background-color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
  }

  .icon-arrow {
    transform: rotate(180deg);
  }

  .sub_menu.fold {
    display: none;
  }

  .fold .icon-arrow {
    transform: rotate(0deg);
  }

  .sub_menu .option {
    height: 41px;
    text-align: left;
    line-height: 41px;
    background-color: #ffffff;
    cursor: pointer;
    padding-left: 60px;
  }

  .sub_menu .option.active {
    background-color: #4B70FF;
    color: #ffffff;
  }
</style>
