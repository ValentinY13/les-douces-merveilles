<template>
  <main>
    <LayoutHeaderSection :items="homeData.blocks.block_header"/>

    <LayoutCarouselSection aria-labelledby="mise en avant">
      <template #header>
        <TitleSection :title="homeData.blocks.block_slider[0].title"
                      :subtitle="homeData.blocks.block_slider[0].subtitle" class="px-6" :id="'mise en avant'"/>
      </template>
      <template #slides>
        <swiper-slide v-for="product in homeData.blocks.block_slider[0].product" :key="product.id"
                      class="max-w-[450px] w-full h-auto">
          <CardCarousel :product="product.product_id" class="relative "/>
        </swiper-slide>
      </template>
    </LayoutCarouselSection>

    <section class="relative" aria-labelledby="citation">
      <nuxt-picture provider="directus"
                    :src="`${homeData.blocks.block_citation.background.id}/${homeData.blocks.block_citation.background.filename_download}`"
                    :alt="homeData.blocks.block_citation.background.title"
                    :img-attrs="{class: 'w-full h-[450px] object-cover' }">
      </nuxt-picture>
      <blockquote class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
        <p id="citation"
           class="font-play text-2xl tracking-widest md:text-3xl font-bold italic uppercase text-center text-white responsive-layout">
          ‘’{{
            homeData.blocks.block_citation.text
          }}‘’</p>
      </blockquote>
    </section>

    <LayoutCarouselSection aria-labelledby="presentation produits">
      <template #header>
        <TitleSection :title="homeData.blocks.block_slider[1].title"
                      :subtitle="homeData.blocks.block_slider[1].subtitle" class="px-6" :id="'mise en avant'"/>
      </template>
      <template #slides>
        <swiper-slide v-for="product in homeData.blocks.block_slider[1].product" :key="product.id"
                      class="max-w-[450px] w-full h-auto">
          <CardCarousel :product="product.product_id" class="relative "/>
        </swiper-slide>
      </template>
    </LayoutCarouselSection>
  </main>
</template>

<script setup lang="ts">
import type {HomeData} from "~/types/home";

const {$directus, $readItems} = useNuxtApp()

const {data: home} = await useAsyncData('home', async () => {
  return $directus.request($readItems('home', {
    fields: [
      'id',
      {
        blocks: [
          'collection',
          'id',
          {
            item: {
              block_header: [
                'id',
                {
                  slides: [
                    'id',
                    'title',
                    {
                      product: [
                        'name',
                        'slug',
                        {
                          sub_category: [
                            'slug'
                          ]
                        },
                        {
                          preview_image: [
                            'id',
                            'filename_download'
                          ]
                        },
                      ]
                    }
                  ]
                }
              ],
              block_slider: [
                'id',
                'subtitle',
                'title',
                {
                  product: [
                    {
                      product_id: [
                        'id',
                        'name',
                        'slug',
                        'number_pieces',
                        'price',
                        {
                          sub_category: [
                            'slug'
                          ]
                        },
                        {
                          preview_image: [
                            'id',
                            'filename_download',
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              block_citation: [
                'id',
                'text',
                {
                  background: ['id', 'filename_download', 'title']
                }
              ]
            }
          }
        ]
      }
    ]
  }));
}, {
  transform: (response: any) => {
    const formattedData: HomeData = {...response, blocks: {}};

    response.blocks.forEach(block => {
      const type = block.collection as keyof HomeData['blocks'];

      if (formattedData.blocks[type]) {
        if (!Array.isArray(formattedData.blocks[type])) {
          formattedData.blocks[type] = [formattedData.blocks[type] as any];
        }
        (formattedData.blocks[type] as any[]).push(block.item);
      } else {
        formattedData.blocks[type] = block.item;
      }
    });

    return formattedData;
  }
});

const homeData = computed(() => home.value as HomeData | null);
</script>