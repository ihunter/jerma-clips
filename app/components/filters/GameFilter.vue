<script setup lang="ts">
const { updateQuery, query } = useQueryBuilder()

const game = ref(query.value.game)
const search = ref('')
const debouncedSearch = refDebounced(search, 500)

function updateSearch(title: string) {
  search.value = title
}

function gameBoxArtUrl(url: string) {
  // https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg
  return url.replace('{width}x{height}', '104x144')
}

function transformGameResponse(data: GameResponse[]) {
  data.forEach((game) => {
    game.box_art_url = gameBoxArtUrl(game.box_art_url)
  })

  return data
}

const { data: games, status } = await useFetch<GameResponse[]>(`/api/games`, {
  query: {
    game: query.value.game,
    search: debouncedSearch,
  },
  transform: transformGameResponse,
  immediate: true,
  server: true,
  lazy: true,
  default: () => [],
})

watch(game, (value) => {
  updateQuery({ game: value as string[] })
})
</script>

<template>
  <v-autocomplete
    v-model="game"
    label="Search for a game"
    no-data-text="No games found"
    :items="games"
    :loading="status === 'pending'"
    item-title="name"
    item-value="id"
    prepend-inner-icon="mdi-controller-classic"
    clearable
    multiple
    chips
    closable-chips
    @update:search="updateSearch"
  >
    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="item.title"
      >
        <template #prepend>
          <v-img width="60" height="80" :src="item.raw.box_art_url" />
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
