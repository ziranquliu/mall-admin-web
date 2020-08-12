<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">接口列表</span>
      <el-button
        class="btn-add"
        @click="handleAddApi()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="apiTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.$index+(listQuery.pageNum - 1) * listQuery.pageSize + 1}}</template>
        </el-table-column>
        <el-table-column label="接口名称" align="center">
          <template slot-scope="scope">{{scope.row.interfaceName}}</template>
        </el-table-column>
        <el-table-column label="接口内容" width="500" align="center">
          <template slot-scope="scope">{{scope.row.interfaceContent}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleHiddenChange(scope.$index, scope.row)"
              :active-value="true"
              :inactive-value="false"
              v-model="scope.row.isEnabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="支持方法" width="80" align="center">
          <template slot-scope="scope">{{scope.row.httpMethod | HttpMethodFilter}}</template>
        </el-table-column>
        <el-table-column label="数据库" width="100" align="center">
          <template slot-scope="scope">{{scope.row.connName}}</template>
        </el-table-column>
        <el-table-column label="版本" width="100" align="center">
          <template slot-scope="scope">{{scope.row.version }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {fetchList,deleteApi,updateApi,updateHidden} from '@/api/api'
  import HttpMethods from '@/utils/HttpMethods'

  export default {
    name: "apiList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        }
      }
    },
    created() {
      this.getList();
    },
    watch: {
      $route(route) {
        this.getList();
      }
    },
    methods: {
      handleAddApi() {
        this.$router.push('/api/addApi');
      },
      getList() {
        this.listLoading = true;
        fetchList(this.parentId, this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleHiddenChange(index, row) {
        updateHidden(row.id,{hidden:row.hidden}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/data/apis/updateApi',query:{id:row.id}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该接口？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApi(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
    filters: {
      HttpMethodFilter(value) {
        return HttpMethods[value];
      }
    }
  }
</script>

<style scoped>

</style>
