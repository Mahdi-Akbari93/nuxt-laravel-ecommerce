<template>
  <ClientOnly>
    <section class="auth_section">
      <div class="container">
        <div class="row mt-3">
          <div class="col-md-6 col-lg-5 offset-md-3 offset-lg-4">
            <div
              v-if="errors.length > 0"
              class="alert alert-danger"
              role="alert"
            >
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="auth-card">
              <div class="card-body">
                <div class="text-center mb-5">
                  <template v-if="payment.status">
                    <span class="auth-icon" style="background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 14px 30px rgba(22,163,74,.35)">
                      <i class="bi bi-check-lg"></i>
                    </span>
                    <h5 class="mt-3 fw-bold" style="color: var(--success)">
                      پرداخت شما با موفقیت انجام شد
                    </h5>
                    <div class="otp-timer mt-3">
                      شماره پیگیری : <span>{{ payment.transId }}</span>
                    </div>
                  </template>

                  <template v-else>
                    <span class="auth-icon" style="background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 14px 30px rgba(239,68,68,.35)">
                      <i class="bi bi-x-lg"></i>
                    </span>
                    <h5 class="mt-3 fw-bold" style="color: var(--danger)">
                      {{ payment.error }}
                    </h5>
                  </template>
                </div>
                <div class="d-flex justify-content-between gap-2 flex-wrap">
                  <NuxtLink
                    v-if="payment.status"
                    to="/profile/orders"
                    class="btn btn-primary"
                    >مشاهده سفارش</NuxtLink
                  >
                  <NuxtLink v-else to="/cart" class="btn btn-dark"
                    >سبد خرید</NuxtLink
                  >

                  <NuxtLink to="/" class="btn btn-dark"
                    >بازگشت به سایت</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <template #fallback>
      <div class="cart-loadnig">
        <div class="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { useCartStore } from "~/store/cart";

definePageMeta({
  middleware: "auth",
});
const cart = useCartStore();
const {
  public: { apiBase },
} = useRuntimeConfig();
const route = useRoute();
const errors = ref([]);
const payment = ref({});

if (process.client) {
  try {
    const data = await $fetch(`${apiBase}/payment/verify`, {
      method: "POST",
      body: {
        token: route.query.trackId,
        status: route.query.success,
      },
    });
    payment.value = data.data;

    if (payment.value.status) {
      cart.clear();
    }
  } catch (error) {
    // این صفحه مستقیم به Laravel وصل است؛ شکل خطا: {status, message, data}
    const messages = error?.data?.data?.message ?? error?.data?.message;
    if (messages) {
      errors.value = Object.values(messages).flat();
    } else {
      payment.value = { status: false, error: "تراکنش با خطا مواجه شد" };
    }
  }
}
</script>
