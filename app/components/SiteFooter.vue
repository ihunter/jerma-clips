<script setup lang="ts">
import { version } from '../package.json'
</script>

<template>
  <footer>
    <div class="text-center">
      Message me on Discord for any issues or suggestions
      <div class="d-inline-block">
        <a
          href="https://discordapp.com/users/178211447350886401"
          class="text-primary underline"
        >Modus Pwnens</a>
      </div>
    </div>
    <div class="text-center text-disabled">
      v{{ version }}
    </div>
  </footer>
</template>

<style scoped></style>
