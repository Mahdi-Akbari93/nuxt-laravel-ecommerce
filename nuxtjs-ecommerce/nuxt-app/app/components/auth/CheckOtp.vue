<template>
  <div>
    <div v-if="errors.length > 0" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <div class="form_container">
        <div class="mb-4">
          <label for="otp" class="form-label">کد ورود ۶ رقمی</label>
          <div class="input-group">
            <span class="input-group-text ig-plain">
              <i class="bi bi-shield-lock"></i>
            </span>
            <input
              v-model="otp"
              type="text"
              class="form-control"
              id="otp"
              style="direction: ltr; text-align: center; letter-spacing: 6px; font-weight: 800"
              placeholder="- - - - - -"
              maxlength="6"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <button @click="checkOtp" :disabled="loading" class="btn btn-primary btn-auth">
            تایید و ورود
            <i class="bi bi-check2"></i>

            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"
            ></div>
          </button>
          <AuthResendOtp @resend-otp-errors="(err) => errors = err"></AuthResendOtp>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const { authUser } = useAuth();
const otp = ref(null);
const toast = useToast();
const errors = ref([]);
const loading = ref(false);

async function checkOtp() {
  if (otp.value == null) {
    toast.error(" کد تایید الزامی است");
    return;
  }

  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp.value)) {
    toast.error("فرمت کد ورود معتبر نیست");
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const data = await $fetch("/api/auth/checkOtp", {
      method: "POST",
      body: { otp: otp.value },
    });

    authUser.value = data;
    toast.success("با موفقیت وارد شدید");

    return navigateTo("/");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
