<template>
    <div class="box product-card">
        <div>
            <div class="img-box">
                <span v-if="isOutOfStock" class="oos-badge">ناموجود</span>
                <span v-else-if="props.product.is_sale" class="sale-badge">
                    {{ salePercent(props.product.price, props.product.sale_price) }}٪ تخفیف
                </span>
                <img src="/images/preloader.png" v-img="props.product.primary_image" :alt="props.product.name">
            </div>
            <div class="detail-box">
                <h5>
                    <NuxtLink :to="`/products/${props.product.slug}`">{{ props.product.name }}</NuxtLink>
                </h5>
                <p>
                    {{ props.product.description }}
                </p>
                <div class="options">
                    <h6 v-if="props.product.is_sale">
                        <del>{{ numberFormat(props.product.price) }}</del>
                        {{ numberFormat(props.product.sale_price) }}
                        <span>تومان</span>
                    </h6>
                    <h6 v-else>
                        {{ numberFormat(props.product.price) }}
                        <span>تومان</span>
                    </h6>

                    <button
                        v-if="!isOutOfStock"
                        @click="addToCart(props.product)"
                        aria-label="افزودن به سبد خرید"
                    >
                        <i class="bi bi-cart-fill text-white fs-5"></i>
                    </button>
                    <button v-else class="btn-oos" disabled aria-label="ناموجود">
                        <i class="bi bi-slash-circle fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useCartStore } from '~/store/cart';

const props = defineProps(['product'])
const cart = useCartStore()
const toast = useToast()

const isOutOfStock = computed(() => Number(props.product.quantity) <= 0);

function addToCart(product){
    if (isOutOfStock.value) {
        toast.error("موجودی این محصول به پایان رسیده است");
        return;
    }
    cart.remove(product.id)
    cart.addToCart(product , 1)
}

</script>
