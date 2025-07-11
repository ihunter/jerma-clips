<script setup lang="ts">
import { useDate } from 'vuetify'

const dayjs = useDayjs()
const adapter = useDate()

const { updateQuery, query } = useQueryBuilder()

const endDate = computed({
  get() {
    if (!query.value.endDate)
      return null

    return adapter.parseISO(query.value.endDate)
  },
  set(value: Date) {
    if (!value)
      clearDate()

    updateQuery({ endDate: dayjs(value).format('YYYY-MM-DD') })
  },
})

function clearDate() {
  updateQuery({ endDate: undefined })
}
</script>

<template>
  <div>
    <v-date-picker v-model="endDate" title="End Date" header="Select End Date" />
    <v-btn color="primary" variant="tonal" @click="clearDate">
      clear date
    </v-btn>
  </div>
</template>
