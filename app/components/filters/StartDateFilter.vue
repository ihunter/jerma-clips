<script setup lang="ts">
import { useDate } from 'vuetify'

const dayjs = useDayjs()
const adapter = useDate()

const { updateQuery, query } = useQueryBuilder()

const startDate = computed({
  get() {
    if (!query.value.startDate)
      return null

    return adapter.parseISO(query.value.startDate)
  },
  set(value: Date) {
    if (!value)
      clearDate()

    updateQuery({ startDate: dayjs(value).format('YYYY-MM-DD') })
  },
})

function clearDate() {
  updateQuery({ startDate: undefined })
}
</script>

<template>
  <div>
    <v-date-picker v-model="startDate" title="Start Date" header="Select Start Date" />
    <v-btn color="primary" variant="tonal" @click="clearDate">
      clear date
    </v-btn>
  </div>
</template>
