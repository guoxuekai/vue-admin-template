<template>
  <div class="item-category-management-container">

    <!--    <classify-panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
          <el-badge :value="categoryCount" class="item" style="width: 100%" type="warning">
            <el-button size="small" style="width: 100%" type="info" plain>Item Category Management</el-button>
          </el-badge>
          <el-table
            :data="categoryData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="itemCategoryID"
              label="ID"
            />
            <el-table-column
              prop="itemCategoryName"
              label="Name"
            />
            <el-table-column
              label="Operation"
            >
              <template slot-scope="{row,$index}">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleUpdate(row, 'category')"
                >
                  Edit
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="small" class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate('category')">
            Add
          </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" />
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
          <el-badge :value="unitCount" class="item" style="width: 100%" type="warning">
            <el-button size="small" style="width: 100%" type="info" plain>Item Unit Management</el-button>
          </el-badge>
          <el-table
            :data="unitData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="itemUnitID"
              label="ID"
            />
            <el-table-column
              prop="itemUnitName"
              label="Name"
            />
            <el-table-column
              label="Operation"
            >
              <template slot-scope="{row,$index}">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleUpdate(row, 'unit')"
                >
                  Edit
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="small" class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate('unit')">
            Add
          </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" />
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
          <el-badge :value="locationCount" class="item" style="width: 100%" type="warning">
            <el-button size="small" style="width: 100%" type="info" plain>Item Location Management</el-button>
          </el-badge>
          <el-table
            :data="locationData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="itemLocationID"
              label="ID"
            />
            <el-table-column
              prop="itemLocationName"
              label="Name"
            />
            <el-table-column
              label="Operation"
            >
              <template slot-scope="{row,$index}">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleUpdate(row,'location')"
                >
                  Edit
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="small" class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate('location')">
            Add
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" style="width: auto; margin-left:20px;">
        <el-form-item v-if="temp.itemCategoryName" label="Name" prop="itemCategoryName">
          <el-input v-model="temp.itemCategoryName" />
        </el-form-item>
        <el-form-item v-if="temp.itemUnitName" label="Name" prop="itemUnitName">
          <el-input v-model="temp.itemUnitName" />
        </el-form-item>
        <el-form-item v-if="temp.itemLocationName" label="Name" prop="itemLocationName">
          <el-input v-model="temp.itemLocationName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData(temp.itemClassify)">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import ClassifyPanelGroup from '@/views/itemClassify/components/ClassifyPanelGroup'
import {
  fetchItemCategory,
  fetchItemUnit,
  fetchItemLocation,
  fetchItemCategoryCount,
  fetchItemUnitCount,
  fetchItemLocationCount,
  updateItemCategory,
  updateItemUnit, updateItemLocation
} from '@/api/item'
import { data } from 'autoprefixer'
export default {
  name: 'Index',
  components: { ClassifyPanelGroup },
  data() {
    return {
      categoryData: null,
      unitData: null,
      locationData: null,
      categoryCount: null,
      unitCount: null,
      locationCount: null,
      dialogFormVisible: false,
      dialogTitle: null,
      dialogStatus: null,
      textMap: {
        update: {
          'category': 'Edit a Classify of Category',
          'unit': 'Edit a Classify of Unit',
          'location': 'Edit a Classify of Location'
        },
        create: {
          'category': 'Create a Classify of Category',
          'unit': 'Create a Classify of Unit',
          'location': 'Create a Classify of Location'
        }
      },
      temp: {
        itemClassify: undefined,
        itemCategoryID: undefined,
        itemCategoryName: undefined,
        itemUnitID: undefined,
        itemUnitName: undefined,
        itemLocationID: undefined,
        itemLocationName: undefined
      }
    }
  },
  created() {
    this.getItemClassify()
  },
  methods: {
    handleCreate(name) {
      this.dialogTitle = this.textMap['create'][name]
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      /* this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })*/
    },
    handleUpdate(row, name) {
      this.itemClassify = name
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogTitle = this.textMap['update'][name]
      this.dialogFormVisible = true
      /* this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })*/
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      if (this.itemClassify === 'category') {
        updateItemCategory(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      } else if (this.itemClassify === 'unit') {
        updateItemUnit(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      } else if (this.itemClassify === 'location') {
        updateItemLocation(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    /* getItemClassify() {
      fetchItemCategory().then(response => {
        this.categoryData = response.data.category
        console.log(this.categoryData)
      })
    },*/
    async getItemClassify() {
      try {
        const responseCategory = await fetchItemCategory()
        this.categoryData = responseCategory.data.category

        const responseUnit = await fetchItemUnit()
        this.unitData = responseUnit.data.unit

        const responseLocation = await fetchItemLocation()
        this.locationData = responseLocation.data.location

        const responseCategoryCount = await fetchItemCategoryCount()
        this.categoryCount = responseCategoryCount.data.count

        const responseUnitCount = await fetchItemUnitCount()
        this.unitCount = responseUnitCount.data.count

        const responseLocationCount = await fetchItemLocationCount()
        this.locationCount = responseLocationCount.data.count
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-category-management-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .wrapper {
    background: #fff;
    padding: 16px 16px 16px;
    margin-bottom: 32px;
  }
}

</style>
