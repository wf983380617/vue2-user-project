<template>
  <div class="base-form">
    <el-form
      :model="formModel"
      ref="formModel"
      class="form-model"
      v-bind="formConfig"
      :inline="formInline"
    >
      <el-row :gutter="formConfig.gutter?formConfig.gutter:0">
        <el-form-item
          v-for="item in formData"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          v-bind="item.formItemConfig"
          :rules="item.rules?item.rules:[]"
        >
          <el-col :span="item.span?item.span:24">
            <!-- 自定义插槽 -->
            <template v-if="item.type == 'SlotItem'">
              <slot :name="item.slotName" :data="item"></slot>
            </template>
            <!-- 输入框 -->
            <template v-if="item.type == 'Input'">
              <el-input
                v-model="formModel[item.prop]"
                v-bind="item.itemConfig"
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                :placeholder="item.placeholder?item.placeholder:'请输入'"
              ></el-input>
            </template>
            <!-- 下拉框 -->
            <template v-if="item.type == 'Select'">
              <el-select
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                v-model="formModel[item.prop]"
                @change="item.change && item.change(formModel[item.prop])"
                v-bind="item.itemConfig"
                :placeholder="item.placeholder?item.placeholder:'请选择'"
              >
                <template v-if="item.options">
                  <el-option
                    v-for="obj in (typeof(item.options) == 'function'?item.options():item.options)"
                    :label="obj.label"
                    :value="obj.value"
                    :key="obj.value"
                  ></el-option>
                </template>
              </el-select>
            </template>
            <!-- 日期 -->
            <template v-if="item.type == 'Date'">
              <el-date-picker
                v-model="formModel[item.prop]"
                v-bind="item.itemConfig"
                :placeholder="item.placeholder?item.placeholder:'请选择'"
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </template>
            <!-- 时间 -->
            <template v-if="item.type == 'Time'">
              <el-time-select
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                v-model="formModel[item.prop]"
                v-bind="item.itemConfig"
                :placeholder="item.placeholder?item.placeholder:'请选择'"
                value-format="HH:mm:ss"
                format="HH:mm:ss"
              ></el-time-select>
            </template>
            <template v-if="item.type==='DateTime'">
              <!-- 日期时间 -->
              <el-date-picker
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                type="datetime"
                v-model="formModel[item.prop]"
                v-bind="item.itemConfig"
                :placeholder="item.placeholder?item.placeholder:'请选择'"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
            <!-- 日期范围 -->
            <template v-if="item.type==='DateRange'">
              <el-date-picker
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                v-model="formModel[item.prop]"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                v-bind="item.itemConfig"
                @change="item.change&&item.change($event,item.prop)"
              />
            </template>
            <!-- 日期时间范围 -->
            <template v-if="item.type==='DateTimeRange'">
              <el-date-picker
                :style="'width:'+(item.width?item.width:formConfig.width?formConfig.width:'')+'px'"
                v-model="formModel[item.prop]"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                v-bind="item.itemConfig"
                @change="item.change&&item.change($event,item.prop)"
              />
            </template>
            <!-- checkbox复选框 -->
            <template v-if="item.type == 'Checkbox'">
              <el-checkbox-group v-model="formModel[item.prop]">
                <el-checkbox
                  v-for="op in item.options"
                  :key="op.value"
                  :label="op.value"
                >{{op.label}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <!-- 单选 -->
            <template v-if="item.type == 'Radio'">
              <el-radio-group v-model="formModel[item.prop]" v-bind="item.itemConfig">
                <el-radio v-for="ra in item.options" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
              </el-radio-group>
            </template>
          </el-col>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item v-if="formBtnObj && formBtnObj.isSearch">
          <el-col :span="formBtnObj.span?formBtnObj.span:24">
            <template v-if="formBtnObj.isSearch">
              <el-button type="primary" style="margin-right:10px" @click="handleSearch">查询</el-button>
              <el-button type="primary" @click="handleReset">重置</el-button>
            </template>
          </el-col>
        </el-form-item>
        <el-form-item v-if="formBtnObj && formBtnObj.formBtnData">
          <el-col :span="formBtnObj.span?formBtnObj.span:24">
            <template v-if="formBtnObj.formBtnData">
              <el-button
                v-for="(item,index) in formBtnObj.formBtnData"
                :key="index"
                v-bind="item.btnConfig"
                :type="item.type ? item.type:'primary'"
                style="margin-right:10px"
                :loading="item.loading ? item.loading : false"
                @click="item.click && item.click(item)"
              >{{item.label}}</el-button>
            </template>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    // 表单数据
    formModel: {
      type: Object,
      default: () => {}
    },
    // 表单校验规则
    formRules: {
      type: Object,
      default: () => {}
    },
    // 表单参数
    formData: {
      type: Array,
      default: () => []
    },
    // 表单配置
    formConfig: {
      type: Object,
      default: () => {}
    },
    // 表单按钮配置
    formBtnObj: {
      type: Object,
      default: () => {}
    },
    formInline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSearch() {
      this.$emit("search");
    },
    handleReset() {
      this.$emit("reset");
    }
  }
};
</script>
<style lang="scss" scoped>
// ::v-deep .el-input__inner {
//   width: 300px !important;
// }
.base-form {
  padding: 20px;
  padding-bottom: 0;
}
</style>