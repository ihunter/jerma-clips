<script setup lang="ts">
const { dayjs } = useDayjs()

const { updateQuery, query } = useQueryBuilder()

const endDate = computed({
  get() {
    return query.value.endDate ?? null
  },
  set(value: Date) {
    if (!value)
      clearDate()

    updateQuery({ endDate: dayjs(value).endOf('day').toISOString() })
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
