<template>
  <div class="test-components">
    <base-form
      ref="baseForm"
      :form-inline="true"
      :form-model="formModel"
      :form-config="formConfig"
      :form-data="formData"
    >
      <template #testSlot="{data}">
        <el-input v-model="formModel[data.prop]" placeholder="测试插槽" style="width:200px"></el-input>
      </template>
    </base-form>
    <base-table
      :btn-list="btnList"
      :table-list="tableData"
      :columns="columns"
      :page-data="pageData"
      :max-height="maxHeight+'px'"
    ></base-table>
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
  data() {
    return {
      formModel: {},
      formConfig: {
        labelPosition: "right",
        labelWidth: "140px"
      },
      formData: [
        {
          type: "SlotItem",
          label: "测试插槽：",
          prop: "testSlot",
          slotName: "testSlot"
        },
        {
          type: "Input",
          label: "测试输入框：",
          prop: "testInput",
          itemConfig: {
            style: "width:200px",
            clearable: true
          }
        },
        {
          type: "Select",
          label: "测试选择框：",
          prop: "testSelect",
          options: [
            {
              label: "数值1",
              value: "value1"
            },
            {
              label: "数值2",
              value: "value2"
            }
          ],
          itemConfig: {
            style: "width:200px",
            clearable: true
          }
        },
        {
          type: "Date",
          label: "测试日期选择框：",
          prop: "testDate",
          itemConfig: {
            style: "width:200px",
            type: "date"
          }
        },
        {
          type: "Time",
          label: "测试时间选择框：",
          prop: "testTime",
          itemConfig: {
            style: "width:200px"
          }
        },
        {
          type: "DateTime",
          label: "日期时间选择框：",
          prop: "testDateTime",
          itemConfig: {
            style: "width:200px"
          }
        }
      ],
      btnList: [
        {
          label: "新增",
          loading: false,
          config: {},
          click: item => {
            this.handleAdd(item);
          }
        },
        {
          label: "导入",
          loading: false,
          config: {},
          click: item => {
            this.handleExport(item);
          }
        }
      ],
      tableData: [],
      columns: {
        loading: false,
        hasNo: true,
        columnData: [
          {
            isText: true,
            label: "姓名",
            prop: "name"
          },
          {
            isText: true,
            label: "年龄",
            prop: "age"
          },
          {
            isStatus: true,
            label: "性别",
            prop: "sex",
            show: row => {
              return row.sex == 1 ? "男" : "女";
            }
          },
          {
            label: "操作",
            action: true,
            actionList: [
              {
                label: "编辑",
                show: row => {
                  return true;
                },
                click: row => {
                  console.log(row);
                },
                config: {
                  type: "text",
                  style: "margin-right:10px"
                }
              },
              {
                label: "删除",
                show: row => {
                  return true;
                },
                click: row => {
                  console.log(row);
                },
                config: {
                  type: "text",
                  style: "color:red"
                }
              }
            ]
          }
        ]
      },
      pageData: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      maxHeight: 200
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableData = [
        {
          name: "wf1",
          age: "30",
          sex: 1
        },
        {
          name: "wf2",
          age: "30",
          sex: 0
        },
        {
          name: "wf3",
          age: "30",
          sex: 1
        },
        {
          name: "wf4",
          age: "30",
          sex: 0
        }
      ];
      this.pageData.total = this.tableData.length;
    },
    handleAdd(btn) {
      this.$router.push({
        name: "bookDetail",
        params: {
          id:1
        }
      });
    },
    handleExport(btn) {
      console.log(btn);
    }
  }
};
</script>