<template>
  <div class="test-components">
    <base-search-table
      :form-inline="true"
      :form-model="formModel"
      :form-config="formConfig"
      :form-btn-obj="formBtnObj"
      :form-data="formData"
      :btn-list="btnList"
      :table-list="tableData"
      :columns="columns"
      :page-data="pageData"
      @search="handleSearch"
      @reset="handleReset"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionChange="handleSelectionChange"
    ></base-search-table>
  </div>
</template>
<script>
import BaseSearchTable from "@/components/BaseSearchTable.vue";
import { PositionList } from "@/api/horizonRecord";

export default {
  components: {
    BaseSearchTable
  },
  data() {
    return {
      formModel: {},
      formConfig: {
        labelPosition: "right",
        labelWidth: "90px",
        width:300
      },
      formBtnObj: {
        isSearch: true,
      },
      formData: [
        {
          type: "Input",
          label: "层位代码：",
          prop: "regCode",
          placeholder: "请输入层位代码",
          itemConfig: {
            style: "width:360px",
            clearable: true
          }
        },
        {
          type: "Input",
          label: "EPC：",
          prop: "epc",
          placeholder: "请输入EPC",
          itemConfig: {
            style: "width:360px",
            clearable: true
          }
        },
        {
          type: "Select",
          label: "操作类型：",
          prop: "status",
          placeholder: "请选择操作类型",
          options: [
            {
              label: "注册",
              value: 1
            },
            {
              label: "注销",
              value: 0
            }
          ],
          itemConfig: {
            style: "width:360px",
            clearable: true
          }
        },
        {
          type: "DateTimeRange",
          label: "操作时间：",
          prop: "time",
          itemConfig: {
            style: "width:360px"
          },
          change: e => {
            if (e) {
              this.formModel.startTime = e[0];
              this.formModel.endTime = e[1];
            } else {
              this.formModel.startTime = "";
              this.formModel.endTime = "";
            }
          }
        }
      ],
      btnList: [
        {
          label: "层位日志导出",
          loading: false,
          config: {},
          click: item => {
            this.handleExport(item);
          }
        }
      ],
      tableData: [],
      columns: {
        tableConfig: {
          border: true//是否有边框
        },
        loading: false,
        hasNo: true, //序号列
        selection: false, //开启多选
        columnData: [
          {
            isText: true,
            label: "层位代码",
            prop: "regCode"
          },
          {
            isText: true,
            label: "EPC",
            prop: "epc"
          },
          {
            isStatus: true,
            label: "操作类型",
            prop: "status",
            show: row => {
              return row.status === 0 ? "注销" : "注册";
            }
          },
          {
            isText: true,
            label: "操作时间",
            prop: "createTime"
          }
        ]
      },
      pageData: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        let formData = this.$lodash.cloneDeep(this.formModel);
        if (formData.time) {
          formData.time = null;
        }
        this.columns.loading = true;
        let params = { ...formData, ...this.pageData };
        const result = await PositionList(params);
        this.tableData = result.data.list;
        this.pageData.total = result.data.total;
        this.columns.loading = false;
      } catch (error) {
        this.columns.loading = false;
      }
    },
    handleSearch() {
      this.pageData.pageNum = 1;
      this.pageData.pageSize = 10;
      this.getList();
    },
    handleReset() {
      this.formModel = {};
      this.pageData.pageNum = 1;
      this.pageData.pageSize = 10;
      this.getList();
    },
    handleExport(btn) {
      console.log(btn);
    },
    handleSizeChange(val) {
      this.pageData.pageNum = 1;
      this.pageData.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageData.pageNum = val;
      this.getList();
    },
    // 获取选中数据
    handleSelectionChange(val) {
      console.log(val, "selection");
    }
  }
};
</script>