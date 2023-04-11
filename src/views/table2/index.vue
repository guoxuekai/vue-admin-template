<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="itemQuery.itemName" placeholder="Name" clearable style="width: 200px;" class="filter-item" @keyup.native="handleFilter" @change="handleFilter" />
      <el-input v-model="itemQuery.itemPartNumber" placeholder="Part Number" clearable style="width: 200px;" class="filter-item" @keyup.native="handleFilter" @change="handleFilter" />
      <!--      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>-->
      <el-select v-model="itemQuery.itemCategoryID" placeholder="Category" clearable class="filter-item" style="width: 130px" @change="handleFilter">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="itemQuery.sortIDOption" style="width: 150px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" icon="el-icon-download" @click="handleDownload">
        Export to Excel
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="itemID" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.itemID }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Thumbnail" width="100" prop="itemID">
        <template slot-scope="{row}">
          <!--          <div style="display: flex; align-items: center">
            <el-image src="http://localhost:8080/static/images/5.jpg" />
            <el-image :src="`http://localhost:8080/${row.itemImgName}`" />
            <span>{{row.itemImgName}}</span>
            <span>{{ row.itemID }}</span>
          </div>-->
          <div style="display: flex; align-items: center">
            <el-image :src="`http://localhost:8080/static/images/${row.itemImgName}`" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="Name" width="200" />
      <el-table-column prop="itemPartNumber" label="Part Number" />
      <el-table-column prop="itemStock" label="Stock" width="100" />
      <el-table-column prop="itemUnitName" label="Unit" width="80" />
      <el-table-column
        label="Category"
        prop="itemCategorieName"
        width="120"
      >
        <template slot-scope="{row}">
          <el-tag
            :type="tagType(row.itemCategoryName)"
            disable-transitions
            effect="light"
            round
            style="margin: auto;"
          >
            {{ row.itemCategoryName }}
          </el-tag>
        </template>
        <!--    <template #default="scope">
          <el-tag
            :type="tagType(scope.row.category)"
            disable-transitions
            effect="light"
            round
          >{{ scope.row.category }}</el-tag>
          <el-tag>{{ scope.row.category }}</el-tag>
        </template>-->
      </el-table-column>
      <el-table-column prop="itemLocationName" label="Location" width="100" />
      <el-table-column prop="itemStatusValue" label="Status" width="100">
        <template slot-scope="{row}">
          <span v-if="row.itemStatus">
            <el-tag
              :type="row.itemStatus ? 'success' : 'warning'"
              style="border-radius: 20px;"
            >
              {{ row.itemStatusValue }}
            </el-tag>
          </span>
          <span v-else>
            <el-tag
              :type="row.itemStatus ? 'success' : 'warning'"
              style="border-radius: 20px;"
            >
              {{ row.itemStatusValue }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <!--        <template #header>-->
        <!--          <el-input v-model="search" size="small" placeholder="Type to search" />-->
        <!--        </template>-->
        <template slot-scope="{row,$index}">
          <el-button
            size="small"
            type="primary"
            @click="handleUpdate(row)"
          >
            Edit
          </el-button>

          <el-button
            v-if="row.itemStatus"
            style="width: 80px"
            size="small"
            type="warning"
            @click="handleModifyStatus(row,true)"
          >
            Draft
          </el-button>
          <el-button
            v-if="!row.itemStatus"
            style="width: 80px"
            size="small"
            type="success"
            @click="handleModifyStatus(row,false)"
          >
            Publish
          </el-button>

          <!--          <el-button
            type="danger"
            size="small"
            @click.prevent="deleteRow(scope.$index, scope.row)"
          >
            Removed
          </el-button>-->

        </template>
      </el-table-column>
      <!--      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="itemQuery.pageNum" :limit.sync="itemQuery.pageSize" @pagination="getItemByPage" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: auto; margin-left:50px;">
        <el-form-item label="Name" prop="itemName">
          <el-input v-model="temp.itemName" />
        </el-form-item>
        <el-form-item label="Part Number" prop="itemPartNumber">
          <el-input v-model="temp.itemPartNumber" />
        </el-form-item>
        <el-form-item label="Stock" prop="itemStock">
          <el-input v-model="temp.itemStock" />
        </el-form-item>
        <el-form-item label="Unit" prop="itemUnitID">
          <el-input v-model="temp.itemUnitID" />
        </el-form-item>
        <el-form-item label="Category" prop="itemCategoryID">
          <!--          <el-select v-model="temp.itemCategoryID" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>-->
          <el-input v-model="temp.itemCategoryID" />
        </el-form-item>
        <el-form-item label="Location" prop="itemLocationID">
          <el-input v-model="temp.itemLocationID" />
        </el-form-item>
        <el-form-item label="Status" prop="itemStatus">
          <!--          <el-select v-model="temp.itemStatus" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>-->
          <el-input v-model="temp.itemStatus" />
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>

        <!--        <el-form-item label="Img Name" prop="itemImgName">
          <el-input v-model="temp.itemImgName" />
        </el-form-item>

        <el-form-item label="Img Path" prop="itemImgPath">
          <el-input v-model="temp.itemImgPath" />
        </el-form-item>-->

        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/item/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="temp"
          prop="itemImgName"
        >
          <img v-if="temp.itemImgName" :src="`http://localhost:8080/static/images/`+temp.itemImgName" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>

        <!--        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle, fetchItemList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { fetchItem, fetchItemCategory, fetchItemLocation, fetchItemByPage, createItem, updateItem, updateItemStatus } from '@/api/item'

const calendarTypeOptions = [
  { key: '1', display_name: 'Harness' },
  { key: '2', display_name: 'Terminal' },
  { key: '3', display_name: 'Connector' },
  { key: '4', display_name: 'Seal' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      itemQuery: {
        pageNum: 1,
        pageSize: 10,
        itemName: undefined,
        itemPartNumber: undefined,
        itemCategoryID: undefined,
        sortIDOption: 'ASC'
      },
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: 'ASC' }, { label: 'ID Descending', key: 'DESC' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        itemID: undefined,
        itemName: undefined,
        itemPartNumber: undefined,
        itemStock: undefined,
        itemUnitID: undefined,
        itemCategoryID: undefined,
        itemLocationID: undefined,
        itemStatus: undefined,
        timestamp: new Date(),
        itemImgName: undefined,
        itemImgPath: undefined,
        itemCategories: undefined,
        itemLocations: undefined,
        itemUnits: undefined

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        itemName: [{ required: true }],
        itemPartNumber: [{ required: true }],
        itemStock: [{ required: true }],
        itemUnitID: [{ required: true }],
        itemCategoryID: [{ required: true, message: 'type is required', trigger: 'change' }],
        itemLocationID: [{ required: true }],
        itemStatus: [{ required: true }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        /* itemImgName: [{ required: true }],
        itemImgPath: [{ required: true }], */
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      imageUrl: ''
    }
  },
  created() {
    // this.getList()
    // this.getItemList()
    this.getItemByPage()
  },
  methods: {
    /*
    getList() {
      this.listLoading = true
      getItems(this.listQuery).then(response => {
        this.list = response.data.items
        // this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    */
    getItemList() {
      this.listLoading = true

      const aaa = fetchItemCategory().then(response => {
        this.itemCategoryList = response.data.category
        console.log('fetchItemCategory()')
        console.log(this.itemCategoryList)
      })

      const abc = fetchItem().then(response => {
        this.list = response.data.items

        console.log('fetchItemList()')
        console.log(this.list)
        console.log(this.listLoading)
        console.log(this.list[0]['itemCategories'][0]['itemCategoryName'])

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getItemByPage() {
      this.listLoading = true
      fetchItemByPage(this.itemQuery).then(response => {
        this.list = response.data.items.records
        this.total = response.data.items.total
        console.log('fetchItemByPage()')
        console.log(this.list)
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    handleFilter() {
      this.itemQuery.pageNum = 1
      this.getItemByPage()
    },
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: 'Item status have been changed' + status,
      //   type: 'success'
      // })
      row.itemStatus = !status
      console.log(row.itemID)
      const tempData = {
        'itemID': row.itemID,
        'itemStatus': row.itemStatus
      }
      let msg = ''
      if (row.itemStatus) {
        msg = 'Published'
      } else {
        msg = 'Draft'
      }
      // this.temp = Object.assign({}, row)
      updateItemStatus(tempData).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Set Item Status as ' + msg,
          type: 'success',
          duration: 3000
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'itemID') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+itemID'
      } else {
        this.listQuery.sort = '-itemID'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          createItem(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 3000
            })
          }).then(() => this.getItemByPage())
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          delete tempData.itemCategories
          delete tempData.itemLocations
          delete tempData.itemUnits
          delete tempData.timestamp
          console.log(tempData)
          console.log(typeof tempData)
          console.log(typeof this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateItem(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }).then(() => this.getItemByPage())
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Name', 'Part Number', 'Stock', 'Unit', 'Category', 'Location', 'Status']
        const filterVal = ['itemName', 'itemPartNumber', 'itemStock', 'itemUnitName', 'itemCategoryName', 'itemLocationName', 'itemStatusValue']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'item-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    filterTag(value, row) {
      return row.category === value
    },
    tagType(value) {
      switch (value) {
        case 'Connector':
          return 'danger'
        case 'Terminal':
          return 'success'
        case 'Seal':
          return 'info'
        case 'Harness':
          return 'warning'
        default:
          return ''
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)

      this.$message.success(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Image format only support JPG/PNG format!')
      }
      if (!isLt2M) {
        this.$message.error('Upload image size maximum limit is 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
