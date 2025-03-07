<template>
  <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :max-pages-shown="6"
      :model-value="currentPage"
      @update:modelValue="updatePage"
      :disable-breakpoint-buttons="true"
      :show-ending-buttons="true"
      :hide-prev-next-when-ends="true"
      type="link"
      link-url="/nos-collections?page=[page]"
  >
    <template #prev-button>
      <i class="icon-link icon-simple-chevron text-2xl text-brown-700"></i>
    </template>

    <template #next-button>
      <i class="icon-link icon-simple-chevron text-2xl rotate-180 text-brown-700"></i>
    </template>

    <template #first-page-button>
      <i class="icon-link icon-double-chevron text-2xl text-brown-700"></i>
    </template>

    <template #last-page-button>
      <i class="icon-link icon-double-chevron text-2xl rotate-180 text-brown-700"></i>
    </template>
  </vue-awesome-paginate>
</template>

<script setup lang="ts">
import {VueAwesomePaginate} from "vue-awesome-paginate";

defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const emit = defineEmits(["update:currentPage"]);

const updatePage = (page: number) => {
  emit("update:currentPage", page);
};
</script>
