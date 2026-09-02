<template>
  <nav
    id="sidebarMenu"
    class="admin-sidebar col-md-3 col-lg-2 d-md-block sidebar collapse"
  >
    <div class="sidebar-inner">
      <div class="sidebar-heading">منوی مدیریت</div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path == '/'}" aria-current="page" to="/">
            <i class="bi bi-grid"></i>
            داشبورد
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/users')}" to="/users">
            <i class="bi bi-people"></i>
            کاربران
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/products')}" to="/products">
            <i class="bi bi-box-seam"></i>
            محصولات
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/categories')}" to="/categories">
            <i class="bi bi-grid-3x3-gap"></i>
            دسته بندی
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/orders')}" to="/orders">
            <i class="bi bi-basket"></i>
            سفارشات
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/transactions')}" to="/transactions">
            <i class="bi bi-currency-dollar"></i>
            تراکنش ها
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{active : $route.path.includes('/coupons')}" to="/coupons">
            <i class="bi bi-percent"></i>
            تخفیف ها
          </NuxtLink>
        </li>
      </ul>

      <div class="sidebar-foot">
        <span class="sidebar-foot-dot"></span>
        نسخه ۱.۰.۰
      </div>
    </div>
  </nav>
</template>
