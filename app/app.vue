<script setup lang="ts">
defineOgImageComponent('NuxtSeo', {
  title: 'Jerma Clip Search',
  description: 'Search for twitch clips of Jerma985 by title, game, and date.',
  theme: '#0AFC9E',
  colorMode: 'dark',
})

const { dayjs } = useDayjs()
const timezoneStore = useTimezoneStore()

onMounted(() => {
  timezoneStore.userTimezone = dayjs.tz.guess()
})
</script>

<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
