<template>
  <section class="profile_section layout_padding">
    <div class="container">
      <div class="heading_container mb-4">
        <span class="section-badge"><i class="bi bi-person-circle"></i> حساب کاربری</span>
        <h2>پنل <span>کاربری</span></h2>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-3 mb-4 mb-lg-0">
          <div class="profile-user-card">
            <div class="d-flex align-items-center gap-3">
              <span class="avatar"><i class="bi bi-person-fill"></i></span>
              <div>
                <div class="user-name">{{ authUser?.name || 'کاربر فروشگاه' }}</div>
                <div class="user-phone">{{ authUser?.cellphone || '-' }}</div>
              </div>
            </div>
          </div>
          <ul class="list-group profile-sidebar-menu">
            <li class="list-group-item p-0">
              <nuxt-link to="/profile" exact-active-class="active" class="profile-menu-link">
                <i class="bi bi-person"></i>
                اطلاعات کاربر
              </nuxt-link>
            </li>
            <li class="list-group-item p-0">
              <nuxt-link to="/profile/addresses" exact-active-class="active" class="profile-menu-link">
                <i class="bi bi-geo-alt"></i>
                آدرس ها
              </nuxt-link>
            </li>
            <li class="list-group-item p-0">
              <nuxt-link to="/profile/orders" exact-active-class="active" class="profile-menu-link">
                <i class="bi bi-bag-check"></i>
                سفارشات
              </nuxt-link>
            </li>
            <li class="list-group-item p-0">
              <nuxt-link to="/profile/transactions" exact-active-class="active" class="profile-menu-link">
                <i class="bi bi-credit-card"></i>
                تراکنش ها
              </nuxt-link>
            </li>
            <li class="list-group-item p-0">
              <a @click.prevent="logout" href="#" class="profile-menu-link danger text-danger">
                <i class="bi bi-box-arrow-right"></i>
                خروج
              </a>
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-lg-9">
            <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useToast } from 'vue-toastification';

const toast = useToast()
const { authUser } = useAuth()

async function logout(){
  await useFetch('/api/auth/logout', {
    method: 'POST'
  })

  authUser.value = null
  toast.warning("با موفقیت از سیستم خارج شدید")
  return navigateTo('/')

}

</script>
