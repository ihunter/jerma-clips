<script setup>
const { updateQuery, query } = useQueryBuilder()

const search = ref(query.value.title)

function searchTitle() {
  updateQuery({ title: search.value })
}

function clearTitle() {
  updateQuery({ title: undefined })
}
</script>

<template>
  <v-text-field
    v-model="search"
    tile
    autofocus
    clearable
    persistent-clear
    hide-details
    variant="solo"
    prepend-inner-icon="mdi-magnify"
    placeholder="Search"
    @keydown.enter="searchTitle"
    @click:clear="clearTitle"
  />
</template>
