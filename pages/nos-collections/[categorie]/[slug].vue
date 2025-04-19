<template>
  <main>
    <section aria-labelledby="Détail du produit">
      <swiper-container class="lg:hidden" ref="swiperElement" init="false">
        <swiper-slide v-for="image in product.images" class="h-[50dvh] md:h-[60dvh]">
          <nuxt-picture
              preload
              provider="directus"
              :alt="product?.name"
              :src="`${image.directus_files_id.id}/${image.directus_files_id?.filename_download}`"
              :img-attrs="{ class: 'w-full h-full object-cover' }"
          >
          </nuxt-picture>
        </swiper-slide>
      </swiper-container>

      <div class="px-6 lg:pt-14">
        <div class="responsive-layout lg:grid lg:grid-cols-2 gap-x-16">
          <BackButton class="hidden lg:block lg:col-span-2 mb-6"/>

          <ProductWithThumbnail class="hidden lg:row-span-2" :images="product.images"/>

          <div class="space-y-6 py-12 lg:pt-0">
            <h1 id="Détail du produit" class="text-h2 text-brown-700 uppercase">{{ product.name }}</h1>
            <p class="text-brown-100 tracking-wider">{{ product.number_pieces }}
              pièce{{ product.number_pieces > 1 ? 's' : '' }} - {{
                product.price
              }}€</p>
            <div class="flex flex-col md:flex-row lg:flex-col gap-6">
              <AddRemove :is-available="isAvailable" :product-name="product.name" :max="product.max"
                         v-model:quantity="quantity"/>
              <button
                  :disabled="!product.is_available || product.number_stock <= 0"
                  class="btn w-full lg:w-fit"
                  @click="add(product, quantity)">
                Ajouter au panier
              </button>
            </div>
          </div>

          <div class="pb-12 lg:col-start-2 lg:row-start-3">
            <AccordionItem title="Description" :content="product.description"/>
            <AccordionItem title="Allergènes et composition" :content="product?.composition"/>
            <p class="font-medium text-brown-700 mt-12" v-if="product?.number_stock == 0">Rupture de stock</p>
            <p class="font-medium text-brown-700 mt-12" v-if="!product?.is_available">Produit actuellement
              indisponible</p>
          </div>
        </div>
      </div>
      <LayoutCarouselSection>
        <template #header>
          <TitleSection :id="'Découvrez également'" :title="`${product?.sub_category.name}`"
                        :subtitle="'Dans la même catégorie'"/>
        </template>
        <swiper-slide v-for="product in sameCatProducts" :key="product.id"
                      class="max-w-[450px] w-full h-auto">
          <CardCarousel :product="product" class="relative "/>
        </swiper-slide>
      </LayoutCarouselSection>
    </section>
  </main>
</template>

<script setup lang="ts">
import type {SwiperOptions} from "swiper/types";
import type {Product} from "~/types";
import AddRemove from "~/components/AddRemove.vue";
import ProductWithThumbnail from "~/components/Card/ProductWithThumbnail.vue";
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore()

const {params} = useRoute();
const {$directus, $readItems, $toast} = useNuxtApp()

const quantity = ref(1)

const swiperElement = ref();

const {data: product, error} = await useAsyncData('product-details', async () => {
      return $directus.request($readItems('product', {
        fields: [
          'id',
          'name',
          'is_available',
          'number_pieces',
          'number_stock',
          'price',
          'composition',
          'description',
          'is_available',
          'max',
          {
            sub_category: [
              'name'
            ]
          },
          {
            images: [
              {
                directus_files_id: [
                  'id',
                  'filename_download'
                ]
              }
            ]
          }
        ],
        filter: {
          slug: {
            _eq: params.slug,
          },
          sub_category: {
            slug: {
              _eq: params.categorie,
            }
          }
        },
      }))
    },
    {
      transform: (data): Product | null => {
        if (!Array.isArray(data) || !data[0]) return null;

        return data[0] as Product;
      }
    }
)

const isAvailable = computed(() => {
  return product.value?.is_available && product.value.number_stock > 0
})

const {data: sameCatProducts} = await useAsyncData('same-category', async () => {
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
        preview_image: [
          'id',
          'filename_download',
        ]
      }

    ],
    filter: {
      id: {
        _neq: product.value.id
      },
      sub_category: {
        slug: {
          _eq: params.categorie,
        }
      },
      status: {
        _eq: 'published',
      }
    },
    limit: 5,
  }))
})

if (!product.value || error.value) {
  throw createError({statusCode: 404, statusMessage: "Produit introuvable"});
}

const swiperOptions: SwiperOptions = {
  spaceBetween: 0,
  slidesPerView: 1,
  grabCursor: true,
  injectStyles: [
    `
    .swiper-pagination-bullet {
      --swiper-pagination-bullet-inactive-opacity: 0.4;
      --swiper-pagination-bullet-inactive-color: lch(82.76% 0 139.09);
    }

    .swiper-pagination-bullet-active {
      --swiper-pagination-color: lch(34.5% 24.09 53.33);
    }
      `
  ],
  pagination: {
    clickable: true
  },
}

onMounted(() => {
  Object.assign(swiperElement.value, swiperOptions);
  swiperElement.value.initialize();
})

const add = (product: Product, quantity: number) => {
  cartStore.addToCart(product.id, quantity, product.max);
  if (cartStore.errors.type === 'error') {
    $toast.error(cartStore.errors.message);
  } else {
    $toast.success(cartStore.errors.message);
  }
}
</script>

<style scoped>

</style>
