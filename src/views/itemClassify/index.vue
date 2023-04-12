<template>
  <div class="item-category-management-container">

<!--    <classify-panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
            <el-badge :value="categoryCount" class="item" style="width: 100%"  type="warning">
              <el-button size="small" style="width: 100%">Item Category Management</el-button>
            </el-badge>
            <el-table
              :data="categoryData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemCategoryID"
                label="ID">
              </el-table-column>
              <el-table-column
                prop="itemCategoryName"
                label="Name">
              </el-table-column>
              <el-table-column
                label="Operation">
                <template slot-scope="{row,$index}">
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleUpdate(row)"
                  >
                    Edit
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate">
              Add
            </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24"></el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
            <el-badge :value="unitCount" class="item" style="width: 100%"  type="warning">
              <el-button size="small" style="width: 100%">Item Unit Management</el-button>
            </el-badge>
           <el-table
              :data="unitData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemUnitID"
                label="ID">
              </el-table-column>
              <el-table-column
                prop="itemUnitName"
                label="Name">
              </el-table-column>
             <el-table-column
                label="Operation">
                <template slot-scope="{row,$index}">
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleUpdate(row)"
                  >
                    Edit
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate">
              Add
            </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24"></el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
            <el-badge :value="locationCount" class="item" style="width: 100%"  type="warning">
              <el-button size="small" style="width: 100%">Item Location Management</el-button>
            </el-badge>
            <el-table
              :data="locationData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemLocationID"
                label="ID">
              </el-table-column>
              <el-table-column
                prop="itemLocationName"
                label="Name">
              </el-table-column>
              <el-table-column
                label="Operation">
                <template slot-scope="{row,$index}">
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleUpdate(row)"
                  >
                    Edit
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate">
              Add
            </el-button>
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import ClassifyPanelGroup from '@/views/itemClassify/components/ClassifyPanelGroup';
import { fetchItemCategory, fetchItemUnit, fetchItemLocation, fetchItemCategoryCount, fetchItemUnitCount, fetchItemLocationCount } from '@/api/item'
import {data} from "autoprefixer";
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
      locationCount: null
    }
  },
  methods: {
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /*getItemClassify() {
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
  },
  created() {
    this.getItemClassify()
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
