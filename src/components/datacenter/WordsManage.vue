<template>
    <div class="container">
        <TableData />
    </div>
</template>
<script>
import TableData from './TableData.vue'
export default {
    name: '',
    components: {
        TableData
    },
    props: {
        editData: {
            type: Object
        }
    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>

</style>
    