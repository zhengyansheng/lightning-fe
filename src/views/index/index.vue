<template>
    <div class="container">
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$router.push({ name: 'serviceTree' })
            })
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>

</style>
