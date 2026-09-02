<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <div class="auth-brand">
        <span class="brand-badge"><i class="bi bi-speedometer2"></i></span>
        <span class="brand-name">پنل مدیریت</span>
      </div>
      <div class="card auth-card">
        <div class="card-body py-5">
          <h4 class="auth-title mb-5 text-center">ورود به پنل ادمین</h4>

          <div v-if="errors.length > 0" class="alert alert-danger">
            <ul class="mb-0">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label htmlFor="email" class="form-label">ایمیل</label>
              <input
                v-model="formData.email"
                type="email"
                class="form-control"
                id="email"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="password" class="form-label">رمز عبور</label>
              <input
                v-model="formData.password"
                type="password"
                class="form-control"
              />
            </div>
            <button type="submit" :disabled="loading" class="btn btn-primary btn-auth-submit">
              ورود
              <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
// import { useAuth } from "~/composables/useAuth";

definePageMeta({
  layout: false,
  middleware: 'guest'
});

const formData = reactive({
  email: "",
  password: "",
});

const toast = useToast();
const errors = ref([]);
const loading = ref(false)
const { authUser} = useAuth()

async function login() {
  if (formData.email === "" || formData.password === "") {
    toast.error("تمام موارد فرم ورود الزامی است.");
    return;
  }

  try {

    loading.value = true;
    errors.value = [];

    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    authUser.value = user
    toast.success("با موفقیت وارد سیستم شدید")
    return navigateTo("/")
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
