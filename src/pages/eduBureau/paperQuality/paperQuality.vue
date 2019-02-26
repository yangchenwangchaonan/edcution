<template>
    <div>
        <HeaderPublic :url_index=url_index></HeaderPublic>
        <div class="paperQuality">
            <div class="paperQuality-content">
                <div class="paperQuality-content-panel">
                    <classNav></classNav>
                </div>
                <div class="paperQuality-content-wrapper">
                    <div class="paperQuality-content-wrapper-side">
                        <left-nav v-model="activeNav" :sideNavList="sideNavList"></left-nav>
                    </div>
                    <div class="paperQuality-content-wrapper-right">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./reset.css"></style>
<script>
    import HeaderPublic from "@/components/header";
    import classNav from "@/components/classNav/index.vue";
    // import leftNav from "@/components/sideNav/leftNav"
    import leftNav from "@/components/sideNav/sideNav.vue";

    export default {
        components: {
            HeaderPublic,
            classNav,
            leftNav
        },
        data() {
            return {
                url_index: 1,   //header下标
                sideNavList: [
                    {
                        label: '成绩分析',
                        id: '1',
                        iconClass: 'sideNav-grade',
                        to: '',
                        children: [
                            {
                                label: '成绩总览',
                                to: '/eduBureau/achievementAnalysis/generalPandect',
                                id: '11'
                            },
                            {
                                label: '上线分析',
                                to: '/eduBureau/achievementAnalysis/onlineAnalysis',
                                id: '12'
                            }
                        ]
                    },
                    {
                        label: '试卷质量',
                        id: '2',
                        iconClass: 'sideNav-paper',
                        to: '',
                        children: [
                            {
                                label: '整体质量',
                                to: '/eduBureau/paperQuality/wholeQuality',
                                id: '21'
                            },
                            {
                                label: '小题质量',
                                to: '/eduBureau/paperQuality/questionsQuality',
                                id: '22'
                            }
                        ]
                    },
                ],
                activeNav: ''
            };
        },
        beforeMount() {
            this.activeNav = this.$route.path;
        }
    }
</script>

