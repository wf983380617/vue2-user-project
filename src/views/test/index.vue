<template>
  <div class="test-components">
    <base-form
      ref="baseForm"
      :form-inline="true"
      :form-model="formModel"
      :form-config="formConfig"
      :form-data="formData"
      :form-btn-obj="formBtnObj"
    >
      <template #testSlot="{data}">
        <el-input v-model="formModel[data.prop]" placeholder="测试插槽" style="width:300px"></el-input>
      </template>
    </base-form>
  </div>
</template>
<script>
import BaseForm from "@/components/BaseForm.vue";
import { validateInteger } from "@/utils/validate";
export default {
  components: {
    BaseForm
  },
  data() {
    return {
      formModel: {},
      formConfig: {
        labelPosition: "right",
        labelWidth: "140px",
        width:300
      },
      formData: [
        {
          type: "SlotItem",
          label: "测试插槽：",
          prop: "testSlot",
          slotName: "testSlot",
          rules: [
            {
              required: true,
              message: "请输入测试插槽",
              trigger: "blur"
            }
          ]
        },
        {
          type: "Input",
          label: "测试输入框：",
          prop: "testInput",
          rules: [
            {
              message: "请输入测试输入框",
              required: true,
              trigger: "blur"
            },
            {
              trigger: "blur",
              validator: validateInteger
            }
          ],
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
          },
          rules: [
            {
              required: true,
              message: "请选择测试选择框",
              trigger: "change"
            }
          ]
        },
        {
          type: "Date",
          label: "测试日期选择框：",
          prop: "testDate",
          itemConfig: {
            style: "width:200px",
            type: "date"
          },
          rules: [
            {
              required: true,
              message: "请选择测试日期选择框",
              trigger: "change"
            }
          ]
        },
        {
          type: "Time",
          label: "测试时间选择框：",
          prop: "testTime",
          itemConfig: {
            style: "width:200px"
          },
          rules: [
            {
              required: true,
              message: "请选择测试时间选择框",
              trigger: "change"
            }
          ]
        },
        {
          type: "DateTime",
          label: "日期时间选择框：",
          prop: "testDateTime",
          itemConfig: {
            style: "width:200px"
          },
          rules: [
            {
              required: true,
              message: "请选择测试日期时间选择框",
              trigger: "change"
            }
          ]
        }
      ],
      formBtnObj: {
        isSearch: true,
        // formBtnData: [
        //   {
        //     label: "提交",
        //     loading: false,
        //     click: item => {
        //       this.handleSubmit(item);
        //     }
        //   },
        //   {
        //     label: "重置",
        //     loading: false,
        //     type: "plain",
        //     click: item => {
        //       this.resetForm(item);
        //     }
        //   }
        // ]
      }
    };
  },
  methods: {
    handleSubmit(btn) {
      btn.loading = false;
      this.$refs.baseForm.$refs.formModel.validate(valid => {
        if (valid) {
          console.log("baseForm", this.formModel);
        } else {
          console.log("errorSubmit");
          return false;
        }
      });
    },
    resetForm(btn) {
      btn.loading = false;
    }
  }
};
</script>