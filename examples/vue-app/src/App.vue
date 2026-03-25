<template>
  <div>Hello, {{ name }}!</div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

defineProps<Props>();
</script>
