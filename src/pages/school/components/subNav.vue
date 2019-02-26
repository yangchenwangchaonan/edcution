<template>
  <div class="paperQuality-subNav">
    <div class="pagerQuality-subNav-left">
      <div class="paperQuality-subNav-back"></div>
      <button class="paperQuality-subNav-btn">高二理科</button>
      <span class="paperQuality-subNav-title">2008年-2019学年一年级期中考试</span>
    </div>
    <div class="pagerQuality-subNav-right">
      <span class="pagerQuality-subNav-right-label">切换班级</span>
      <el-select style="width: 100px;" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '高二1班'
        },
        {
          value: '2',
          label: '高二2班'
        }
      ],
      value: '1'
    }
  }
}
</script>
<style scoped>
  .paperQuality-subNav {
    padding: 20px 20px;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 4px 0 #E9E9F2;
    border-radius: 6px;
    position: relative;
  }
  .paperQuality-subNav .pagerQuality-subNav-left {
    
  }
  .paperQuality-subNav .pagerQuality-subNav-left .paperQuality-subNav-title {
    font-size: 18px;
    position: relative;
    bottom: 9px;
    margin: 0 0 0 7px;
  }
  .paperQuality-subNav .pagerQuality-subNav-left .paperQuality-subNav-btn {
    cursor: pointer;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    height: 28px;
    padding: 0 7px;
    border: 1px solid #4B70FF;
    color: #4B70FF;
    position: relative;
    bottom: 12px;
    margin: 0 0 0 16px;
  }
  .paperQuality-subNav .pagerQuality-subNav-left .paperQuality-subNav-btn:hover {
    background: #4B70FF;
    color: #fff;
  }
  .paperQuality-subNav .pagerQuality-subNav-right {
    position: absolute;
    right: 20px;
    top: 18px;
  }
  .paperQuality-subNav .pagerQuality-subNav-right .pagerQuality-subNav-right-label {
    color: #A2AFCD;
    margin: 0px 8px 0 0;
    position: relative;
    top: 3px;
  }
  .paperQuality-subNav .paperQuality-subNav-back {
    cursor: pointer;
    display: inline-block;
    width: 36px;
    height: 36px;
    position: relative;
    top: 2px;
    background-image: url('../../../../assets/images/h_ter_list_arrow.png');
    background-size: 100%; 
  }
</style>
<style>

</style>