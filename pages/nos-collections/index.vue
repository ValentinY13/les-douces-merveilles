<template>
  <main>
    <section aria-labelledby="Nos collections" id="Tous les produits" class="responsive-layout">
      <TitleSection id="Nos collections" title="Tous nos chocolats" subtitle="Découvrez" class="my-8"/>
      <ul class="flex flex-wrap justify-center gap-4 mb-8">
        <InputCheckboxChip v-for="category in categories" :key="category.id" tag="li" name="category"
                           :checked-value="category.name">{{ category.name }}
        </InputCheckboxChip>
      </ul>

      <div class="flex flex-col md:flex-row justify-end gap-2 w-fit md:w-full md:gap-4 mb-4">
        <div>
          <label>Tri par :</label>
          <select v-model="sortBy" class="cursor-pointer">
            <option value="name">Nom</option>
            <option value="price">Prix</option>
          </select>
        </div>
        <div>
          <label>Ordre :</label>
          <select v-model="sortOrder" class="cursor-pointer">
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-12">
        <CardProduct v-for="product in paginatedProducts" :key="product.id" :item="product"/>
      </div>
      <div class="w-full text-center">
        <Pagination :total-items="filteredProducts?.length || 0"
                    :items-per-page="itemsPerPage"
                    v-model:currentPage="currentPage"
                    @update:currentPage="updatePage"/>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/yup";
import * as yup from "yup";

const {$directus, $readItems} = useNuxtApp();
const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page) || 1);
const itemsPerPage = ref(6);

const sortBy = ref('name')
const sortOrder = ref('asc')

const {data: products, execute: execute1} = useAsyncData('nos-collections', async () => {
  return $directus.request($readItems('product', {
    fields: [
      'id',
      'name',
      'number_pieces',
      'price',
      'slug',
      {
        sub_category: [
          'name',
          'slug'
        ]
      },
      {
        images: [
          {
            directus_files_id: [
              'id',
              'filename_download',
            ]
          },
        ]
      },
    ],
    filter: {
      status: {
        _eq: 'published',
      }
    }
  }))
}, {immediate: false});

const {data: categories, execute: execute2} = useAsyncData('categories', async () => {
  return $directus.request($readItems('sub_category', {
    fields: [
      'id',
      'name',
    ],
    filter: {
      status: {
        _eq: 'published',
      }
    },
  }))
}, {immediate: false})

try {
  await Promise.all([execute1(), execute2()])
} catch (e) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found', fatal: true});
}

const categoryNames = computed(() => categories.value?.map(c => c.name) || []);

const {values} = useForm({
  validationSchema: toTypedSchema(yup.object({
    category: yup.array().of(yup.string().oneOf(categoryNames.value)).default([]),
  }))
})

const filteredProducts = computed(() => {
  return values.category?.length ?
      products.value?.filter(product => values.category.includes(product.sub_category?.name)) :
      products.value
})

const paginatedProducts = computed(() => {
  if (!sortedProducts.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedProducts.value.slice(start, start + itemsPerPage.value);
});

// Trie les produits A-Z Z-A price ASC price DESC
const sortedProducts = computed(() => {
  if (!filteredProducts.value) return [];

  return [...filteredProducts.value].sort((a, b) => {
    let valueA = a[sortBy.value];
    let valueB = b[sortBy.value];

    // Cast en number sinon problème de tri
    if (sortBy.value === "price") {
      valueA = Number(valueA) || 0;
      valueB = Number(valueB) || 0;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder.value === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder.value === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
});

const totalPages = computed(() => {
  return Math.ceil((filteredProducts.value?.length || 1) / itemsPerPage.value);
});

// Vérifie le nombre de page à afficher dans la pagination
watch([paginatedProducts, totalPages], ([products, pages]) => {
  if (products.length === 0 && currentPage.value > 1) {
    currentPage.value = 1;
    router.push({query: {...route.query, page: 1}});
  }

  // S'assurer que currentPage ne dépasse pas le totalPages
  if (currentPage.value > pages) {
    currentPage.value = pages;
    router.push({query: {...route.query, page: pages}});
  }
});

// surveille le changement de pagination pour scroll top
watch(currentPage, () => {
  const section = document.getElementById("Tous les produits");
  if (section) {
    section.scrollIntoView({behavior: "smooth", block: "start"});
  }
});


/* Link et SEO */
const updatePage = (newPage: number) => {
  router.push({query: {...route.query, page: newPage}});
};

watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1;
});

useHead({
  link: [
    currentPage.value > 1 ? {rel: "prev", href: `/nos-collections?page=${currentPage.value - 1}`} : null,
    currentPage.value < Math.ceil((products.value?.length || 1) / itemsPerPage.value)
        ? {rel: "next", href: `/nos-collections?page=${currentPage.value + 1}`}
        : null
  ].filter(Boolean)
});
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  cursor: pointer;
}

.paginate-buttons:hover {
  color: var(--color-brown-700);
}

.active-page {
  color: var(--color-brown-700);
  font-weight: bold;
}
</style>