<template>
  <div>
    <!-- single product section -->
    <section class="single_page_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="row gy-5">
              <div class="col-sm-12 col-lg-6">
                <div class="product-info">
                  <span class="section-badge"><i class="bi bi-fire"></i> محصول ویژه</span>
                  <h1 class="fw-bold mt-3 mb-2" style="font-size: 1.7rem">{{ product.data.name }}</h1>

                  <div v-if="product.data.is_sale" class="price-box">
                    <div class="price-current">
                      {{ numberFormat(product.data.sale_price) }}
                      <span class="toman">تومان</span>
                    </div>
                    <del class="price-old">{{ numberFormat(product.data.price) }}</del>
                    <span class="discount-chip">
                      <i class="bi bi-tags-fill"></i>
                      {{ salePercent(product.data.price, product.data.sale_price) }}% تخفیف
                    </span>
                  </div>
                  <div v-else class="price-box">
                    <div class="price-current">
                      {{ numberFormat(product.data.price) }}
                      <span class="toman">تومان</span>
                    </div>
                  </div>

                  <p class="product-desc">{{ product.data.description }}</p>

                  <div class="product-buy">
                    <button
                      v-if="!isOutOfStock"
                      @click="addToCart(product.data)"
                      class="btn-add"
                    >
                      <i class="bi bi-cart-plus-fill"></i>
                      افزودن به سبد خرید
                    </button>
                    <button v-else class="btn-add btn-oos" disabled>
                      <i class="bi bi-slash-circle"></i>
                      ناموجود
                    </button>
                    <div class="input-counter" v-if="!isOutOfStock">
                      <span class="plus-btn" @click="() => quantity < product.data.quantity && quantity++"> + </span>
                      <div class="input-number">{{ quantity }}</div>
                      <span class="minus-btn" @click="() => quantity > 1 && quantity--"> - </span>
                    </div>
                  </div>

                  <div class="mt-4 d-flex flex-wrap gap-3" style="color: var(--muted); font-size: 0.85rem">
                    <span v-if="!isOutOfStock">
                      <i class="bi bi-check-circle-fill" style="color: var(--success)"></i>
                      موجود در انبار ({{ product.data.quantity }} عدد)
                    </span>
                    <span v-else style="color: var(--danger)">
                      <i class="bi bi-x-circle-fill"></i>
                      فعلا ناموجود است
                    </span>
                    <span><i class="bi bi-truck" style="color: var(--brand)"></i> ارسال سریع</span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-lg-6">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide product-gallery"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      class="active"
                    ></button>

                    <button
                      v-for="(image, index) in product.data.images"
                      :key="index"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      :data-bs-slide-to="`${index + 1}`"
                    ></button>
                  </div>

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src="/images/preloader.png"
                        class="d-block w-100"
                        width="464"
                        height="309"
                        v-img="product.data.primary_image"
                        alt="..."
                      />
                    </div>

                    <div
                      v-for="(image, index) in product.data.images"
                      :key="index"
                      class="carousel-item"
                    >
                      <img
                        src="/images/preloader.png"
                        class="d-block w-100"
                        width="464"
                        height="309"
                        v-img="image.image"
                        alt="..."
                      />
                    </div>
                  </div>

                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>

                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end single product section -->

    <section class="food_section my-5">
      <div class="container">
        <div class="heading_container heading_center mb-3">
          <span class="section-badge"><i class="bi bi-shuffle"></i> پیشنهاد ما</span>
          <h2>شاید <span>این‌ها را هم بپسندید</span></h2>
        </div>
        <div class="row gx-3">
          <div v-for="product in randomProduct.data" :key="product.id" class="col-sm-6 col-lg-3">
            <ProductCard :product="product"></ProductCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart';
const quantity = ref(1)


const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

console.log(route.params.slug);

const { data: product } = await useFetch(
  `${apiBase}/products/${route.params.slug}`,
);

const { data: randomProduct } = await useFetch(
  `${apiBase}/random-products?count=4`,
);



const cart = useCartStore()

const isOutOfStock = computed(() => Number(product.value?.data?.quantity) <= 0);

function addToCart(product){
    cart.remove(product.id)
    cart.addToCart(product , quantity.value)
}

</script>
