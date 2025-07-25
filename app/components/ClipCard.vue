<script setup lang="ts">
const props = defineProps<{
  id: string
  url: string
  broadcasterId: string
  broadcasterName: string
  creatorName: string
  title: string
  viewCount: number
  createdAt: string
  thumbnailUrl: string
  duration: number
  gameId?: string
  gameName?: string
  gameBoxArtUrl?: string
}>()

const { dayjs } = useDayjs()
const timezoneStore = useTimezoneStore()

const timeFromNow = computed(() => dayjs(props.createdAt).tz(timezoneStore.userTimezone).fromNow())

const createdAtCalendar = computed(() =>
  dayjs(props.createdAt).tz(timezoneStore.userTimezone).format('M/D/YYYY'),
)

const createdAtTime = computed(() => dayjs(props.createdAt).tz(timezoneStore.userTimezone).format('h:mm a'))

const formattedGameBoxArtUrl = computed(() => {
  // https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg
  return props.gameBoxArtUrl?.replace('{width}x{height}', '104x144')
})

const formattedViewCount = computed(() => props.viewCount.toLocaleString())

const formattedDuration = computed(() => dayjs.duration(props.duration, 'seconds').format('m:ss'))

const { updateQuery } = useQueryBuilder()

function setDateFilter() {
  const tz = timezoneStore.userTimezone
  updateQuery({
    startDate: dayjs(props.createdAt).tz(tz).format('YYYY-MM-DD'),
    endDate: dayjs(props.createdAt).tz(tz).format('YYYY-MM-DD'),
  })
}
</script>

<template>
  <v-card tag="article" class="overflow-visible">
    <div class="hover-effect-container" :href="url">
      <div class="hover-effect">
        <NuxtLink :to="url" target="_blank">
          <v-img
            :aspect-ratio="30 / 17"
            lazy-src="~/assets/images/clip_placeholder.png"
            :src="thumbnailUrl"
            :title="title"
            :alt="title"
            cover
          >
            <div class="d-flex flex-column justify-space-between h-100">
              <div class="pa-2 d-flex">
                <div v-if="duration" class="d-flex ga-1 px-1 align-center bg-opacity">
                  <v-icon icon="mdi-timer-outline" size="small" />
                  <div>{{ formattedDuration }}</div>
                </div>
              </div>

              <div class="pa-2 d-flex justify-space-between">
                <div class="d-flex ga-2 px-2 align-center bg-opacity">
                  <v-icon icon="mdi-eye-outline" />
                  <div>{{ formattedViewCount }}</div>
                </div>

                <div class="px-2 bg-opacity">
                  {{ timeFromNow }}
                </div>
              </div>
            </div>

            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate />
              </div>
            </template>

            <template #error>
              <v-img src="~/assets/images/clip_placeholder_404.png" />
            </template>
          </v-img>
        </NuxtLink>
      </div>
    </div>
    <section class="d-flex">
      <div class="filter">
        <v-img
          width="52"
          height="72"
          lazy-src="~/assets/images/game_box_art_placeholder.jpg"
          :src="formattedGameBoxArtUrl"
          :title="gameName"
          :alt="`Game box art for ${gameName}`"
          @click="gameId && updateQuery({ game: [gameId] }) "
        >
          <template #placeholder>
            <v-img src="~/assets/images/game_box_art_placeholder.jpg" alt="placeholder" cover />
          </template>
        </v-img>
      </div>
      <div class="px-2 overflow-hidden">
        <h4 class="text-truncate" :title="title">
          {{ title }}
        </h4>
        <div class="text-subtitle-2" :title="`Clipped by ${creatorName}}`">
          Clipped by <span class="filter" @click="updateQuery({ creator: creatorName })">{{ creatorName }}</span>
        </div>
        <div class="text-subtitle-2" :title="`on ${createdAtCalendar} at ${createdAtTime}`">
          on <span class="filter" data-allow-mismatch @click="setDateFilter">{{ createdAtCalendar }}</span> at <span data-allow-mismatch>{{ createdAtTime }}</span>
        </div>
      </div>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
$border-size: 5px;
$border-color: rgb(var(--v-theme-primary));
$transition-duration: 200ms;
$transition-function: ease-in;

a {
  color: white;
  text-decoration: none;
}

.filter {
  cursor: pointer;
}

.filter:hover {
  color: $border-color;
  text-decoration: underline;
}

.bg-opacity {
  background-color: rgba(0, 0, 0, .5);
}

.hover-effect-container {
  transition: background-color 0s $transition-function calc($transition-duration - 50ms);
}

.hover-effect-container:hover {
  background-color: $border-color;
  transition-delay: 100ms;
}

.hover-effect {
  will-change: transform;
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover {
  transform: translate3d($border-size, calc(-1 * $border-size), 0);
}

.hover-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-top: $border-size solid transparent;
  border-bottom: $border-size solid transparent;
  border-right: $border-size solid $border-color;
  transform-origin: left center;
  transform: translate3d(0, calc(-1 * $border-size), 0) scale(0);
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover::before {
  transform: translate3d(calc(-1 * $border-size), 0, 0) scale(1);
}

.hover-effect::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-left: $border-size solid transparent;
  border-right: $border-size solid transparent;
  border-top: $border-size solid $border-color;
  transform-origin: center bottom;
  transform: translate3d($border-size, 0, 0) scale(0);
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover::after {
  transform: translate3d(0, $border-size, 0) scale(1);
}
</style>
