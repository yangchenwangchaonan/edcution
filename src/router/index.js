import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
//教师
import TeacherOverview from '@/pages/teacher/overview'
import teacher from "@/pages/teacher"
import TeacherScore from '@/pages/teacher/score'
import TeacherPassRate from '@/pages/teacher/passRate'
import TeacherComment from '@/pages/teacher/comment'
import classAndSubject from '@/pages/teacher/studentAnalysis/classAndSubject'
import classAnalysis from '@/pages/teacher/studentAnalysis/classAndSubject/classAnalysis/index.vue'
import subjectAnalysis from '@/pages/teacher/studentAnalysis/classAndSubject/subjectAnalysis'

import TeacherTermList from "@/pages/teacher/studentAnalysis/termList/termList"
import TeacherLessonPreparation from "@/pages/teacher/LessonPreparation"
//import TeacherOverview from "@/pages/teacher/overview"

// 教育局
import eduoverview from '@/pages/eduBureau/overview'
import eduBureau from "@/pages/eduBureau"
import generalPandect from "@/pages/eduBureau/achievementAnalysis/generalPandect"
import onlineAnalysis from "@/pages/eduBureau/achievementAnalysis/onlineAnalysis"
import eduOverallQuality from '@/pages/eduBureau/overallQuanlity/index.vue';
import eduQuestionsQuality from '@/pages/eduBureau/questionsQuality/questionsQuality';
import termList from "@/pages/eduBureau/studentAnalysis/termList/termList"
import EduAverage from "@/pages/eduBureau/studentAnalysis/average"
import EduPassRate from "@/pages/eduBureau/studentAnalysis/passRate"
import EduQuality from "@/pages/eduBureau/studentAnalysis/quality"

// 校领导
import SchoolOverview from '@/pages/school/overview'
import School from "@/pages/school/index"
import SchoolGeneralPandect from "@/pages/school/generalPandect";
import SchoolOverallQuality from '@/pages/school/overallQuanlity/index.vue';
import SchoolOnlineAnalysis from '@/pages/school/onlineAnalysis';
import SchoolTermList from "@/pages/school/studentAnalysis/termList/termList";
import SchoolQuestionsQuality from '@/pages/school/questionsQuality/questionsQuality';
import SchoolAverage from "@/pages/school/studentAnalysis/average";
import SchoolPassRate from "@/pages/school/studentAnalysis/passrate";
import SchoolQuality from "@/pages/school/studentAnalysis/quality";
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: 'interface',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        //教师
        {
          path: '/teacher/overview', //老师总览
          name: 'teacherOverview',
          component: TeacherOverview
        }, {
            path: '/teacher',
            name: 'teacher',
            component: teacher
        }, {
            path: '/teacher/score',
            name: 'score',
            component: TeacherScore
        }, {
            path: '/teacher/passrate',
            name: 'passRate',
            component: TeacherPassRate
        }, {
            path: '/teacher/comment',
            name: 'comment',
            component: TeacherComment
        }, {
            path: '/teacher/classAndSubject',
            name: 'classAndSubject',
            component: classAndSubject,
            children: [
                // 班级分析
                {
                    path: 'classAnalysis',
                    name: 'classAnalysis',
                    component: classAnalysis
                },
                // 学科分析
                {
                    path: 'subjectAnalysis',
                    name: 'subjectAnalysis',
                    component: subjectAnalysis
                }
            ]
        },
        {
            path: '/teacher/studentAnalysis/termList',
            name: 'TeacherTermList',
            component: TeacherTermList
        },
        {
          path: '/teacher/lessonPreparation', //老师总体分析－备课
          name: 'lessonPreparation',
          component: TeacherLessonPreparation
        },
        // 教育局
        //教学总览
        {
            path: '/eduBureau/overview',
            name: 'eduoverview',
            component: eduoverview
        },
        //考情分析
        {
            path: '/eduBureau',
            name: 'eduBureau',
            component: eduBureau
        },
            //试卷质量
        {
            path: '/eduBureau/achievementAnalysis/generalPandect', //成绩分析
            name: 'generalPandect',
            component: generalPandect
        },
        {
            path: '/eduBureau/achievementAnalysis/onlineAnalysis',//上线分析
            name: 'onlineAnalysis',
            component: onlineAnalysis
        },
        {
            path: '/eduBureau/overallQuanlity',//整体质量
            name: 'eduOverallQuality',
            component: eduOverallQuality
        },
        {
            path: '/eduBureau/questionsQuality/questionsQuality',//小题质量
            name: 'eduquestionsQuality',
            component: eduQuestionsQuality
        },

        //学情分析
        {
            path: '/eduBureau/studentAnalysis/termList',
            name: 'termList',
            component: termList
        },
        {
            path: '/eduBureau/studentAnalysis/average',   //超均率情况
            name: 'average',
            component: EduAverage
        },
        {
            path: '/eduBureau/studentAnalysis/passrate',   //上线情况
            name: 'EduPassRate',
            component: EduPassRate
        },
        {
            path: '/eduBureau/studentAnalysis/quality',   //试题质量
            name: 'quality',
            component: EduQuality
        },

        // 学校领导
        {
            path: '/schooloverview',  //教学总览
            name: 'schoolOverview',
            component: SchoolOverview
        },
        {
            path: '/school',
            name: 'School',
            component: School
        },
        {
            path: '/school/overview',
            name: 'SchoolOverview',
            component: SchoolOverview
        },
        {
            path: '/school/generalPandect', //成绩总览
            name: 'schoolGeneralPandect',
            component: SchoolGeneralPandect
        },
        {
            path: '/school/onlineAnalysis', //线上分析
            name: 'SchoolOnlineAnalysis',
            component: SchoolOnlineAnalysis
        },
        {
            path: '/school/overallquality', //整体质量
            name: 'SchoolOverallQuality',
            component: SchoolOverallQuality
        },
        {
            path: '/school/studentAnalysis/termList',
            name: 'SchoolTermList',
            component: SchoolTermList
        },
        {
            path: '/school/questionsQuality',
            name: 'SchoolquestionsQuality',
            component: SchoolQuestionsQuality
        },
        {
            path: '/school/studentAnalysis/termList',
            name: 'schoolTermList',
            component: termList
        },  {
            path: '/school/studentAnalysis/average',   //超均率情况
            name: 'SchoolAverage',
            component: SchoolAverage
        }, {
            path: '/school/studentAnalysis/passrate',   //上线情况
            name: 'SchoolPassRate',
            component: SchoolPassRate
        }, {
            path: '/school/studentAnalysis/quality',   //试题质量
            name: 'SchoolQuality',
            component: SchoolQuality
        },
    ]
})
