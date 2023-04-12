<template>
  <div class="item-category-management-container">

    <classify-panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
            <el-table
              :data="categoryData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemCategoryID"
                label="Category ID">
              </el-table-column>
              <el-table-column
                prop="itemCategoryName"
                label="Category Name">
              </el-table-column>
            </el-table>
            <el-button class="filter-item" style="margin-top: 20px; width: 100%" icon="el-icon-edit" @click="handleCreate">
              Add
            </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
           <el-table
              :data="unitData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemUnitID"
                label="Unit ID">
              </el-table-column>
              <el-table-column
                prop="itemUnitName"
                label="Unit Name">
              </el-table-column>
            </el-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wrapper">
            <el-table
              :data="locationData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="itemLocationID"
                label="Location ID">
              </el-table-column>
              <el-table-column
                prop="itemLocationName"
                label="Location Name">
              </el-table-column>
            </el-table>
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import ClassifyPanelGroup from '@/views/itemClassify/components/ClassifyPanelGroup';
import { fetchItemCategory, fetchItemUnit, fetchItemLocation } from '@/api/item'
import {data} from "autoprefixer";
export default {
  name: 'Index',
  components: { ClassifyPanelGroup },
  data() {
    return {
      categoryData: null,
      unitData: null,
      locationData: null
    }
  },
  methods: {
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
