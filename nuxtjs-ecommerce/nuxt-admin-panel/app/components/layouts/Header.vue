<template>
  <header class="admin-topbar">
    <a class="topbar-brand" href="#">
      <span class="brand-badge"><i class="bi bi-speedometer2"></i></span>
      <span class="brand-name">پنل مدیریت</span>
    </a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="topbar-side">
      <div class="topbar-user">
        <span class="topbar-avatar"><i class="bi bi-person"></i></span>
        <span class="topbar-username">{{ authUser.name }}</span>
      </div>
      <button @click="logout" class="topbar-logout" type="button">
        <i class="bi bi-box-arrow-left"></i>
        <span>خروج</span>
      </button>
    </div>
  </header>
</template>



<script setup>
import { useToast } from 'vue-toastification';

const toast = useToast()
const {authUser} = useAuth()

async function logout (){
  await useFetch('/api/auth/logout' , {
    method: 'POST'
  })

  authUser.value = null
  toast.warning("با موفقیت از سیستم خارج شدید")
  return navigateTo('/auth/login')
}

</script>
