<script setup lang="ts">
const { updateQuery, query } = useQueryBuilder()
const debouncedCreator = ref(query.value.creator)

watchDebounced(debouncedCreator, (value) => {
  updateQuery({ creator: value ?? undefined })
}, {
  debounce: 500,
})
</script>

<template>
  <v-text-field
    v-model="debouncedCreator"
    label="Creator Name"
    prepend-inner-icon="mdi-account"
    autocomplete="off"
    clearable
    outlined
  />
</template>
