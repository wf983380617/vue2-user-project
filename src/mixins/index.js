/**
 * 父子组件及mixins生命周期执行顺序为：
 * mixin的beforeCreate >
 * 父beforeCreate >
 * mixin的created >
 * 父created >
 * mixin的beforeMount >
 * 父beforeMount >
 * 子beforeCreate >
 * 子created >
 * 子beforeMount >
 * 子mounted >
 * mixin的mounted >
 * 父mounted
 *  */
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.editPageText();
  },
  methods: {
    // 修改el-pagination的文字
    editPageText() {
      let pageText = document.getElementsByClassName("el-pagination__jump")[0];
      if (pageText) {
        //可能存在不显示页码的情况，所以最好判断一下避免报错~
        pageText.childNodes[0].nodeValue = "跳至";
        // pageText.style.color = "#409EFF";
      }
    },
    /**
     * 在最后一页删除最后一条数据的时候  currentPage改为上一页  不然数据是空的
     * Math.ceil向上取整
     * @param {总记录数} total
     * @param {每页条数} pageSize
     * @param {页码} pageNum
     * @returns 当前页码
     */
    getLastPage(total, pageSize, pageNum) {
      //定义一个 当前总页数totalPage :  当前总页数等于 = 总条数减去删除一条数据  除以  每页的条数
      let totalPage = Math.ceil((total - 1) / pageSize);
      //假设没删除之前当前页码在最后一页, 也就是第4页，删除后总页数就是上面定义的  totalPage  为 3
      let currentPage = totalPage < pageNum ? totalPage : pageNum;
      //还有一种情况就是只有一条数据时,删除后,当前页码设置为 1
      currentPage = currentPage < 1 ? 1 : currentPage;
      return currentPage;
    },
  },
};
