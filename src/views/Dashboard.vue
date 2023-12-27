<template>
 <div class="table">
   <div class="wrapper">
     <h1>asd</h1>
        <CommonTable v-if="data" :data="data" :loading="loading" :columnsTable="columns" :extendHeader="extendHeader" :extendBody="extendBody" @detailLoan="detailBorrower" filter action />
   </div>
 </div>
</template>

<script lang="ts">

import {defineComponent, onMounted, ref} from 'vue'
import { useRouter } from "vue-router"
import useDashboard from "@/composables/useDashboard"
import CommonTable from "@/components/common/Table.vue"
import { QTableColumn } from 'quasar'


export default defineComponent({
    components: {
      CommonTable
    },
    setup(){

    const router = useRouter();
    const filter = ref("")

    const { data , loading, error, fetchData} = useDashboard();

    const columns = ref<QTableColumn[]>([
      { name: "id", label: "ID Transaction", field: "id", align: "center" },
      { name: "amount", label: "Loan Amount", field: "amount", align: "center", sortable: true },
      { name: "interestRate", label: "Interest Rate", field: "interestRate", align: "center", sortable: true },
      { name: "term", label:"Term", field: "term", align: "center", sortable: true}
    ]);

    const extendHeader = ref([
      { id: 1, value: "Name" },
    ])

    const extendBody = ref([
      { id: 1, field: "borrower", value: "name"},
    ])

  
    const detailBorrower = (index: string | any) => {
        router.push(`/dashboard/loan/${index}`)
    }


     onMounted(() => {
        fetchData()
    })

        return {
            data,
            loading,
            error,
            columns,
            detailBorrower,
            filter,
            extendHeader,
            extendBody
        }

    }
})

</script>

<style lang="scss" scoped>

.table {
  width: 100%;
  padding: 0%;

  .wrapper {
    position: relative;
    width: 100%;
  }

}

input {
    padding: 5px;
    letter-spacing: 2px;
}

:deep(.q-btn){
    background: #ED5C27 !important;
}


:deep(.q-td){
    letter-spacing: 1.5px !important;
}
</style>