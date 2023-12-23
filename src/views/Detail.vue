<template>
    <div class="detail" v-if="data">
        <div class="wrapper">
            <div class="detail__title">
                <span>ID Transaction: <br /></span>
                <span>{{ detailLoan.id }}</span>
            </div>
            <div class="detail__description">
                <div class="download-document">
                    <button @click="downloadDocument(detailLoan.document)">Download Document</button>
                </div>
                <div class="form">
                    <div class="section">
                        <div class="highlight">
                            <div class="wrapper">
                                <div v-for="items in detailLoan.highlight" :key="items" class="content" >
                                    <span>{{ items.label }}</span>
                                    <span>{{ items.value }}</span>
                                </div>
                            </div>
                            <div class="repayment-schedule">
                                 <span>Repayment Schedule</span>
                                <CommonTable :data="detailLoan.termLoan" :columns="columns" />
                            </div>
                        </div>
                        <div class="detail-borrower">
                            <span class="title">Detail Borrower</span>
                            <hr />
                            <div class="wrapper">
                                <div v-for="items in detailLoan.borrower" :key="items" class="content" >
                                    <span>{{ items.label }}</span>
                                    <span>{{ items.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed , onMounted, ref} from "vue"
import { useRoute } from "vue-router"
import useDashboard from '@/composables/useDashboard'
import CommonTable from "@/components/common/Table.vue"

export default defineComponent({
    components: {
        CommonTable
    },
    setup(){

        const route = useRoute();

        const { data, loading , error, fetchData } = useDashboard();

        const detailLoan = computed(() => {
           const detail = data?.value?.find((items: any) => items.id === route.params.id)

           if (detail){
               return {
                   id: detail.id,
                   highlight: [
                   {label: "Amount", value: detail.amount},
                   {label: "Interest Rate", value: detail.interestRate},
                   {label: "Term", value: detail.term},
                   {label: "Purpose", value: detail.purpose},
                   {label: "Risk Rating", value: detail.riskRating}
                   ],
                   document: detail.documents[0].url,
                   termLoan: detail.repaymentSchedule.installments,
                   borrower: [
                       { label: "Id", value: detail.borrower.id },
                       { label: "Name", value: detail.borrower.name },
                       { label: "Email", value: detail.borrower.email },
                       { label: "Credit Score", value: detail.borrower.creditScore},
                       { label: "Collateral", value: detail.collateral.type },
                       { label:  "Value Collateral", value: detail.collateral.value }
                   ]
               }
           }
        })

        const downloadDocument = (code: string) => {
         window.open(code, '_blank', 'noreferrer')
      }

        const columns = ref([
         { name: "dueDate", label: "Due Date", field: "dueDate", align: "center" },
         { name: "amountDue", label: "Amount Due", field: "amountDue", align: "center" },
        ]);


        onMounted(() =>{
            fetchData()
        })


        return {
            detailLoan,
            data,
            loading,
            error,
            route,
            columns,
            downloadDocument,
        }
    }
})

</script>

<style lang="scss" scoped>
.detail {
    max-width: 100%;

    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }

    &__title {
        font-size: 10px;
        margin: 30px 0px;
        font-weight: bold;
    }

    &__description {
        padding: 5%;
        border: 1px solid;
        border-radius: 10px;
        position: relative;

        .download-document {
            text-align: end;
            padding: 10px;

            button {
                padding: 1%;
                background: #ED5C27;
                color: #ffffff;
                border: 1px solid ;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
        }

        .form {
            margin-top: 20px;
            position: relative;

            .section {

                .highlight {
            
                    .wrapper{
                        display: flex;
                        flex-direction: column;
                        gap: 20px;

                       
                        .content {
                             display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }

                        span:nth-child(2){
                            border: 1px solid red;
                            padding: 3%;
                            border-radius: 5px;
                            font-weight: 500;
                        }

                    }

                    .repayment-schedule {
                        margin-top: 30px;

                        span:nth-child(1){
                            font-weight: bold;
                        }
                        
                    }

                }

                .detail-borrower {
                    margin-top: 40px;

                    .title{
                        font-weight: bold;
                    }

                    hr {
                        margin: 10px 0px;
                    }

                    .wrapper {
                        
                        .content {
                            display: flex;
                            margin-top: 10px;
                            flex-direction: column;
                            gap: 10px;
                        }

                        span:nth-child(1){
                            font-weight: bold;
                        }

                    }

                }

            }

        }
    }

}


@media (min-width: 1080px){
    .detail {
        
        .wrapper {

        }

        &__title {
            font-size: 20px;

            span:nth-child(2){
                font-weight: 100;
            }

        }

        &__description {

            .form {

                .section {

                    .highlight {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 5%;
                    }

                    .detail-borrower {
                        
                        .wrapper {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                        }

                    }

                }

            }

        }

    }
}

:deep(.q-table__container){
    margin-top: 20px;
}
</style>