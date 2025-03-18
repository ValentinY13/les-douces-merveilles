<template>
  <div>
    <TheMenu/>
    <slot/>
    <LayoutNewsletter/>
    <LayoutQualities/>
    <TheFooter/>
  </div>
</template>

<script lang="ts" setup>
// onMounted(() => {
//   try {
//     const data = JSON.parse(localStorage.getItem("cart"));
//     console.log(data)
//   } catch (error) {
//     console.log(error);
//   }
// })
</script>