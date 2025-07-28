<script setup lang="ts">
const { dayjs } = useDayjs()

const { updateQuery, query } = useQueryBuilder()

const startDate = computed({
  get() {
    return query.value.startDate ?? null
  },
  set(value: Date) {
    if (!value)
      clearDate()

    updateQuery({ startDate: dayjs(value).startOf('day').toISOString() })
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
