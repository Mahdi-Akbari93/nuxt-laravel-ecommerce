<template>
  <div class="sub_page">
    <div class="hero_area">
      <header class="header_section">
        <div class="container">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <NuxtLink class="navbar-brand d-flex align-items-center" to="/" @click="mobileOpen = false">
              <span class="brand-badge"><i class="bi bi-lightning-charge-fill"></i></span>
              <span class="brand-name"> md-ak.ir </span>
            </NuxtLink>

            <button
              class="navbar-toggler"
              type="button"
              :aria-expanded="mobileOpen ? 'true' : 'false'"
              aria-label="باز و بسته کردن منو"
              @click="mobileOpen = !mobileOpen"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" :class="{ show: mobileOpen }" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item" :class="{ active: $route.path === '/' }">
                  <NuxtLink class="nav-link" to="/" @click="mobileOpen = false">صفحه اصلی</NuxtLink>
                </li>
                <li class="nav-item" :class="{ active: $route.path === '/menu' }">
                  <NuxtLink class="nav-link" to="/menu" @click="mobileOpen = false">منو</NuxtLink>
                </li>
                <li class="nav-item" :class="{ active: $route.path === '/about-us' }">
                  <NuxtLink class="nav-link" to="/about-us" @click="mobileOpen = false">درباره ما</NuxtLink>
                </li>
                <li class="nav-item" :class="{ active: $route.path === '/contact-us' }">
                  <NuxtLink class="nav-link" to="/contact-us" @click="mobileOpen = false">تماس باما</NuxtLink>
                </li>
              </ul>
              <div class="user_option">
                <NuxtLink class="icon-btn position-relative" to="/cart" aria-label="سبد خرید" @click="mobileOpen = false">
                  <i class="bi bi-cart-fill fs-5"></i>
                  <ClientOnly>
                    <span v-if="countCartItems > 0" class="cart-badge">
                      {{ countCartItems }}
                    </span>
                  </ClientOnly>
                </NuxtLink>
                <NuxtLink v-if="authUser" to="/profile" class="btn-auth" @click="mobileOpen = false">
                  <i class="bi bi-person-fill-gear"></i>
                  پروفایل
                </NuxtLink>
                <NuxtLink v-else to="/auth/login" class="btn-auth" @click="mobileOpen = false">
                  <i class="bi bi-box-arrow-in-left"></i>
                  ورود
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/store/cart";

const route = useRoute();
const { authUser } = useAuth();
const cart = useCartStore();

const countCartItems = computed(() => cart.count);
const mobileOpen = ref(false);

watch(() => route.fullPath, () => {
  mobileOpen.value = false;
});
</script>
