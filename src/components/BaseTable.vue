<template>
  <div class="base-table">
    <!-- 按钮区域 -->
    <div class="btn-area" v-if="btnList.length">
      <el-button
        v-for="(item,index) in btnList"
        :key="index"
        :type="item.type?item.type:'primary'"
        :loading="item.loading?item.loading:false"
        @click="item.click && item.click(item)"
        style="margin-right:10px"
        v-bind="item.config?item.config:null"
      >{{item.label}}</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table-area">
      <el-table
        ref="tableData"
        :data="tableList"
        v-loading="columns.loading?columns.loading:false"
        v-bind="columns.tableConfig?columns.tableConfig:''"
        :highlight-current-row="true"
        :row-key="getRowKey"
        :max-height="maxHeight"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <!-- 选择框是否开启，selectable控制是否单行禁用 -->
        <el-table-column
          v-if="columns.selection"
          type="selection"
          :selectable="columns.selectable"
          :reserve-selection="true"
          width="50px"
        />
        <!-- 序号列 -->
        <template v-if="columns.hasNo">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
        </template>
        <!-- 普通列 -->
        <el-table-column
          v-for="(column,index) in columns.columnData"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.config?column.config:false"
          :sortable="column.sortable"
          :index="index"
        >
          <template slot-scope="{row}">
            <!-- 文本 -->
            <span v-if="column.isText">{{row[column.prop] ? row[column.prop] : '-'}}</span>
            <!-- 根据状态值显示文本 -->
            <span v-if="column.isStatus">{{column.show(row) || row[column.prop]}}</span>
            <!-- 插槽 -->
            <slot v-if="column.isSlot" :name="column.slotName" :row="row"></slot>
            <!-- 操作按钮 -->
            <template v-if="column.action">
              <span v-for="(op, index) in column.actionList" :key="index">
                <el-button
                  v-if="op.show && op.show(row)"
                  @click="op.click && op.click(row)"
                  v-bind="op.config"
                >{{op.label}}</el-button>
              </span>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div v-if="pageData" class="page-div">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="false"
        :current-page="pageData.pageNum"
        :pager-count="7"
        :page-sizes="pageData.pageSizes || [10,20,30,40,50]"
        :page-size="pageData.pageSize"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="pageData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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
    },
    maxHeight: {
      type: String || Number,
      default: "300px"
    }
  },
  data() {
    return {};
  },
  //js代码
  mounted() {
    let pageText = document.getElementsByClassName('el-pagination__jump')[0]
    if (pageText) { //可能存在不显示页码的情况，所以最好判断一下避免报错~
      pageText.childNodes[0].nodeValue = '跳至'
    }
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 点击行
    rowClick(row, column, event) {
      this.$refs.tableData.toggleRowSelection(row);
      this.$emit("rowClick", row, column, event);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleSelectAll(val) {
      // 1.1当选择所有 选项框状态为 √ 时
    }
  }
};
</script>
<style lang="scss" scoped>
.base-table {
  .btn-area {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .page-div {
    text-align: right;
    margin-top: 20px;
  }
}
</style>