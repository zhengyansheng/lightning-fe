<template>
<div>
    <el-page-header @back="goBack" :content="'详情信息'" style="margin-bottom: 10px;"></el-page-header>
    <div class="data-center-table">
        <div class="classify-nav">
            <p :class="{'active': currentNav === 'basicInfo'}" @click="currentNav = 'basicInfo'">基本信息</p>
            <p :class="{'active': currentNav === 'MyRelation'}" @click="currentNav = 'MyRelation'">我关联的</p>
            <p :class="{'active': currentNav === 'relationMe'}" @click="currentNav = 'relationMe'">关联我的</p>
            <p :class="{'active': currentNav === 'change'}" @click="currentNav = 'change'">变更记录</p>
        </div>
        <div class="meta"></div>
        <div class="classify-container" v-show="currentNav === 'basicInfo'">
            <el-form ref="form" label-width="80px" style="width: 500px; margin: auto;">
                <el-form-item :label="item.label+' : '" v-for="(item, index) in cardInfo" :key="index">
                    <span>{{item.value}}</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="classify-container" v-show="currentNav === 'MyRelation'">
            <template v-if="myRelationTableData">
                <div v-for="(items, index) in myRelationTableData" :key="index" style="margin-bottom: 20px;">
                    <el-card>
                        <div slot="header" class="clearfix" style="display:flex;align-items:center;justify-content:space-between;">
                            <span  style="font-weight:bold;font-size:16px;color: #303133;">{{items.table_name}}</span>
                        </div>
                        <el-table :data="items.tableList" border style="width: 100%">
                            <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                            <el-table-column
                                v-for="(item, i) in items.theadList"
                                v-bind="item" :key="i" :label="item.label" :prop="item.props" >
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.props] }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </template>
            <div v-else class="no-data">暂无数据</div>
        </div>
        <div class="classify-container" v-show="currentNav === 'relationMe'">
            <template v-if="relationMeTableData">
                <div v-for="(items, index) in relationMeTableData" :key="index" style="margin-bottom: 20px;">
                    <el-card>
                        <div slot="header" class="clearfix" style="display:flex;align-items:center;justify-content:space-between;">
                            <span  style="font-weight:bold;font-size:16px;color: #303133;">{{items.table_name}}</span>
                        </div>
                        <el-table :data="items.tableList" border style="width: 100%">
                            <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                            <el-table-column
                                v-for="(item, i) in items.theadList"
                                v-bind="item" :key="i" :label="item.label" :prop="item.props" >
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.props] }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </template>
            <div v-else class="no-data">暂无数据</div>
        </div>
        <div class="classify-container" v-show="currentNav === 'change'">
            <el-timeline>
                <el-timeline-item :timestamp="item.create_time" placement="top" v-for="(item, index) in changeData" :key="index">
                    <div class="year">{{item.create_time}}</div>
                    <el-card shadow="hover">
                        <div class="card-infos">
                            <p style="font-weight:bold;font-size:16px;">{{item.title}}</p>
                            <pre style="white-space: pre-wrap;margin:15px 0;text-indent: 34px;line-height: 20px;">{{item.detail}}</pre>
                            <p style="font-size:14px;text-align:right;font-weight:bold;">{{item.operator}}</p>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-pagination v-if="changeData.length" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                currentNav: 'basicInfo',
                myRelationTableData: [],
                relationMeTableData: [],
                cardInfo: {},
                currentPage: 1,
                changeData: []
            }
        },
        created() {
            this.getDetails();
            this.currentNav = 'basicInfo';
            this.getChangeRecords();
        },
        methods: {
            getDetails() {
                if (!this.$route.query.id) return false;
                this.api.assetscenter.fetchSearchDetail(this.$route.query.id).then(res => {
                    this.cardInfo = this.formatBaiscInfo(res.data)
                    this.myRelationTableData = this.formatTableData(res.data.children)
                    this.relationMeTableData = this.formatTableData(res.data.relevant)
                })
            },
            formatBaiscInfo(tableObj) {
                let valueData = tableObj.data ? tableObj.data.data : {};
                let fields = tableObj ? tableObj.fields : {};
                let theadList = [];
                for(let key in fields) {
                    theadList.push({
                        props: key,
                        label: tableObj.fields[key]['name'],
                        order: tableObj.fields[key]['order'],
                        value: valueData[key]
                    })
                }
                theadList.sort((a, b) => a.order - b.order)
                return theadList;
            },
            formatTableData(children) {
                if (!children) return false;
                let allTableData = []
                children.forEach(items => {
                    let fields = items ? items.fields : {};
                    let theadList = [];
                    for(let key in fields) {
                        theadList.push({
                            props: key,
                            label: items.fields[key]['name'],
                            order: items.fields[key]['order'],
                        })
                    }
                    theadList.sort((a, b) => a.order - b.order)

                    let data = items ? items.data : [];
                    let tableList = data.map(item => { 
                        let obj = {...item, ...item.data}
                        return obj
                    })
                    let tableObj = {
                        theadList,
                        tableList,
                        table_name: items.table_name,
                        table_id: items.table_id
                    }
                    allTableData.push(tableObj)
                })
                return allTableData
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getChangeRecords()
            },
            getChangeRecords() {
                if (!this.$route.query.id) return false;
                let params = {
                    table_data_id: this.$route.query.id,
                    page: this.currentPage
                }
                this.api.assetscenter.fetchRecordList(params).then(res => {
                    if (res.data && res.data.results && res.data.results.length) {
                        this.changeData = res.data.results;
                        this.total = res.data.count
                    } 
                })
            },
            goBack() {
                this.$router.push({name: 'sclist'})
            }
        },
        beforeDestroy() {
            this.currentNav = 'basicInfo';
            this.changeData = []
            this.myRelationTableData = []
            this.relationMeTableData = []
            this.currentPage = 1
            this.cardInfo = {}
            this.total = 0
        },
    }
</script>
<style lang="scss" scoped>
.data-center-table {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    // box-shadow: 0 0 8px 0 rgba(232,237,250,60%), 0 2px 4px 0 rgba(232,237,250,50%);
    background-color: #fff;
    .classify-nav {
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &>p {
            display: inline-block;
            cursor: pointer;
        }
        .active {
            font-weight: 700;
        }
    }
    .meta {
        background-color: #fafafa;
        border-top: 1px solid #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    .classify-container {
        padding: 24px;
        box-sizing: border-box;
    }
}

.table-head {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.year {
  position: absolute;
  left: -150px;
  top: 1px;
}
// .card-infos {
//     &>p {
//         display: flex;
//         flex-direction: row;
//         justify-content: flex-start;
//         align-items: flex-start;
//         &>label {
//             width: 120px;
//             flex-shrink: 0;
//         }
//     }
// }
/deep/ .el-timeline {
    margin-left: 150px;
    .el-timeline-item__timestamp {
        display: none;
    }
}
/deep/ .el-pagination {
    margin-top: 10px;
    text-align: center;
}

/deep/ .el-card__header {
    background: rgb(217, 236, 255);
}
</style>
