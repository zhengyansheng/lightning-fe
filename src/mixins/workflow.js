
import ShowWorkorderDetail from '@components/workflow/ShowWorkorderDetail'
import {
    workorderStatusOptions,
    workorderExecStatusOptions,
    auditRecordOptions
} from '@/utils/dict'
import {
    Workorder
} from '@services/workflow'
import {
    handleDetailU
} from '@/utils/workflowutils'
const statusKeyValue = workorderStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
const execStatusKeyValue = workorderExecStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
export default {
    data() {
        return {
            showWorkorderDetail: false
        }
    },
    components: {
        ShowWorkorderDetail
    },
    filters: {
        woStatusFilter(status) {
            return statusKeyValue[status]
        },
        execStatusFilter(status) {
            return execStatusKeyValue[status]
        },
        reviewFilter(opinion) {
            for (var i = 0; i < auditRecordOptions.length; i++) {
                if (opinion === auditRecordOptions[i].key) {
                    return auditRecordOptions[i].display_name
                }
            }
        },
        statusFilter(status) {
          const statusMap = {
            published: 'success',
            draft: 'info',
            deleted: 'danger'
          }
          return statusMap[status]
        }
    },
    created() {
    },
    methods: {
        handleDetail(row) {
            this.showWorkorderDetail = true;
            handleDetailU(this, row, Workorder)
        },
        // 页码切换
        currentPageChange() {
            this.getTableList();
        },
        // 搜索
        searchData() {
            this.params.page = 1;
            this.getTableList();
        }
    }
}