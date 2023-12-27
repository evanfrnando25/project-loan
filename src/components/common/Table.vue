<template>
    <q-table v-if="data" flat bordered :rows="data" :columns="columnsTable" :filter="localFilter" row-key="id" :loading="loading">
      <template v-if="filter" v-slot:top>
        <span class="table-search">
          <input type="text" v-model="localFilter"  placeholder="Find ID Transaction" />
        </span>        
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>No.</q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props" >
            {{ col.label }}
          </q-th>
          <q-th v-for="items in extendHeader" :key="items.id">{{ items.value  }}</q-th>
          <q-th v-if="action">Action</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            {{ props.pageIndex + 1 }}
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td  v-for="items in extendBody"  :key="items.id" class="text-center" auto-width>
              <span v-if="items.field">{{ props.row[items.field][items.value] }}</span>
              {{ props.row[items.value] }}
          </q-td>
          <q-td v-if="action" class="text-center">
              <q-btn @click="detailBorrower(props.row.id)" push color="primary" label="Detail" />
          </q-td>
        </q-tr>
      </template>
      {{ filter }}
    </q-table>
    <div v-if="error">
      <h5>Something wrong</h5>
    </div>
</template>


<script lang="ts">

import { defineComponent, PropType, ref} from "vue"
import { QTableProps } from 'quasar'


export interface ExtendHeader {
    id: any;
    value: string;
}

export interface ExtendBody {
  id: number;
  field: string
  value: string;
}

export interface DataDetailLoan {
  dueDate: any;
  amountDue: any;
}


export default defineComponent({
    props: {
        data: {
            required: false,
            type: Array as PropType<QTableProps['rows']> | any,
        },
        columnsTable: {
            required: false,
            type: Array as PropType<QTableProps['columns']>,
        },
        action: {
            required: false,
            type: Boolean
        },
        filter: {
            required: false,
            type: Boolean
        },
        extendHeader: {
            required: false,
            type: Array as PropType<ExtendHeader[]>,
        },
        extendBody:{
            required: false,
            type: Array as PropType<ExtendBody[]>,
        },
        loading: {
            required: false,
            type: Boolean
        },
        error: {
          required: false,
          type: String || Object || Array || null
        }
    },
    emits: {
      detailLoan: null,
    },
    setup(props, { emit }){

        const detailBorrower = (index: any) => {
            emit('detailLoan', index)
        }

        const localFilter = ref("")
       
        return {
            localFilter,
            detailBorrower
        }
    }
})

</script>