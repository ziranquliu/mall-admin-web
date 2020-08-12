<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据库列表</span>
      <el-button
        class="btn-add"
        @click="handleAddDb()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="dbTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.$index+(listQuery.pageNum - 1) * listQuery.pageSize + 1}}</template>
        </el-table-column>
        <el-table-column label="连接名称" align="center">
          <template slot-scope="scope">{{scope.row.connName}}</template>
        </el-table-column>
        <el-table-column label="连接信息" width="300" align="center">
          <template slot-scope="scope">{{scope.row.connStr}}</template>
        </el-table-column>
        <el-table-column label="接口数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.apiNumbers}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="100" align="center">
          <template slot-scope="scope">{{scope.row.isEnabled | enableFilter }}</template>
        </el-table-column>
        <el-table-column label="查询类型" width="100" align="center">
          <template slot-scope="scope">{{scope.row.queryType }}</template>
        </el-table-column>
        <el-table-column label="版本" width="100" align="center">
          <template slot-scope="scope">{{scope.row.version }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
  import {fetchList,deleteDb,updateDb,updateHidden} from '@/api/db'

  export default {
    name: "dbList",
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
      handleAddDB() {
        this.$router.push('/db/addDB');
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
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
        this.$router.push({path:'/data/dbs/updatedb',query:{id:row.id}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDB(row.id).then(response => {
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
      enableFilter(value) {
        if (value) {
          return '是';
        } else {
          return '否';
        }
      }
    }
  }
</script>

<style scoped>

</style>
