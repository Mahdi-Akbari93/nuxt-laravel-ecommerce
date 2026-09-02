<template>
    <section class="food_section layout_padding-bottom">
        <div class="container">
            <div class="heading_container heading_center">
                <span class="section-badge"><i class="bi bi-menu-button-wide"></i> منو فروشگاه</span>
                <h2>منو <span>محصولات</span></h2>
                <p>محبوب‌ترین محصولات ما را دسته‌بندی شده ببینید و سفارش دهید.</p>
            </div>

            <Tabs nav-class="filters_menu" nav-item-active-class="active" :options="{ disableScrollBehavior: true }">
                <Tab v-for="(tabList, index) in productsData.tabList" :key="index" :name="tabList">
                    <div class="filters_content">
                        <div class="row grid">
                            <div v-for="product in productsData.tabPanel[index]" :key="product.id" class="col-sm-6 col-lg-4">
                              <ProductCard :product="product"></ProductCard>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <div class="btn-box text-center">
                <NuxtLink to="/menu" class="btn-add">
                    مشاهده تمام محصولات منو
                    <i class="bi bi-arrow-left"></i>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Tabs, Tab } from 'vue3-tabs-component';

const { public: { apiBase } } = useRuntimeConfig();

const { data: products, error } = await useFetch(`${apiBase}/products/products-tabs`);
const productsData = computed(() => products.value?.data ?? { tabList: [], tabPanel: [] });

// console.log(productsData.value);

</script>
