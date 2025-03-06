<script setup>
import {ref, computed, onMounted} from 'vue'

const products = ref([]) // Stocke les produits récupérés
const currentPage = ref(1)
const perPage = ref(5) // Nombre d'éléments affichés par page

// Charger les produits depuis Directus
onMounted(async () => {
  const response = await fetch('https://ton-api-directus.com/items/produits')
  const result = await response.json()
  products.value = result.data
})

// Détecter la taille de l'écran
const updatePerPage = () => {
  perPage.value = window.innerWidth >= 1024 ? 7 : 5
}

onMounted(() => {
  updatePerPage()
  window.addEventListener('resize', updatePerPage)
})

// Pagination
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return products.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => Math.ceil(products.value.length / perPage.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="product in paginatedProducts" :key="product.id" class="p-4 border rounded">
        {{ product.name }}
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between mt-4">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>
