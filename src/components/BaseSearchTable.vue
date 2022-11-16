<template>
  <div class="base-form-table" style="height: calc(100vh - 140px)">
    <div class="base-form">
      <base-form
        ref="baseForm"
        :form-inline="formInline"
        :form-model="formModel"
        :form-config="formConfig"
        :form-data="formData"
        :form-btn-obj="formBtnObj"
        @search="handleSearch"
        @reset="handleReset"
      ></base-form>
    </div>
    <div class="base-table">
      <base-table
        ref="baseTable"
        :btn-list="btnList"
        :table-list="tableList"
        :columns="columns"
        :page-data="pageData"
        :max-height="tableHeight +'px'"
        @rowClick="rowClick"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
      ></base-table>
    </div>
  </div>
</template>
  <script>
import BaseForm from "@/components/BaseForm.vue";
import BaseTable from "@/components/BaseTable.vue";
export default {
  components: {
    BaseForm,
    BaseTable
  },
  props: {
    // 表单是否行内模式
    formInline: {
      type: Boolean,
      default: false
    },
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
    // 表格数据
    tableList: {
      type: Array,
      default: () => []
    },
    // 按钮数据
    btnList: {
      type: Array,
      default: () => []
    },
    // 表格属性
    columns: {
      type: Object,
      default: () => {}
    },
    // 分页数据
    pageData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      tableHeight: 300
    };
  },
  mounted() {
    let that = this;
    that.getHeight();
    //监听窗口变化
    window.onresize = function() {
      that.getHeight();
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    // 动态计算表格的高度
    getHeight() {
      let that = this;
      that.$nextTick(() => {
        const docEl = document.getElementsByClassName("base-form-table")[0];
        const searchElement = document.getElementsByClassName("base-form")[0];
        that.tableHeight =
          `${docEl.clientHeight - searchElement.clientHeight}` - 120;
      });
    },
    // 搜索
    handleSearch() {
      this.getHeight();
      this.$emit("search");
    },
    // 重置
    handleReset() {
      this.getHeight();
      this.$emit("reset");
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    // 分页切换条数
    handleSizeChange(val) {
      this.getHeight();
      this.$emit("sizeChange", val);
    },
    // 分页切换页数
    handleCurrentChange(val) {
      this.getHeight();
      this.$emit("currentChange", val);
    },
    // 选中列数据
    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>