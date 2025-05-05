<script setup lang="ts">
const isOpen = ref(false)

const togglePopup = () => {
  isOpen.value = !isOpen.value
}

// expose the togglePopup function to the parent component
defineExpose({
  togglePopup
})
</script>

<template>
  <slot name="activator" :is-open="isOpen" :toggle-popup="togglePopup"></slot>

  <Teleport to="#teleports">
    <transition name="fade">
      <div v-if="isOpen"
           class="bg-white/80 fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center px-6 py-24 overflow-y-auto backdrop-blur-xs"
           @click.self="togglePopup">
        <div class="w-full my-auto" @click.self="togglePopup">
          <slot :is-open="isOpen" :togglePopup="togglePopup"></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>

</style>