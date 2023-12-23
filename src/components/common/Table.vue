<template>
    <q-table v-if="data" flat bordered :rows="data" :columns="columns" :filter="localFilter" row-key="id" :loading="loading">
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
          <q-th v-for="items in extendHeader" :key="items.id" :sortable="items.sortable">{{ items.value  }}</q-th>
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
           <q-td v-for="items in extendBody" :key="items.id" class="text-center" auto-width>
              <span v-if="items.field">{{ props.row[items.field][items.value] }}</span>
              {{ props.row[items.value] }}
          </q-td>
          <q-td v-if="action" class="text-center">
              <q-btn @click="$emit('detailLoan', props.row.id)" push color="primary" label="Detail" />
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

import { defineComponent, ref} from "vue"

export default defineComponent({
    props: {
        data: {
            required: false,
            type: Array || null,
        },
        columns: {
            required: true,
            type: Array,
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
            type: Array
        },
        extendBody:{
            required: false,
            type: Array
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
    setup(props, { emit }){

        
        const localFilter = ref("")
       
        return {
            localFilter
        }
    }
})

</script>