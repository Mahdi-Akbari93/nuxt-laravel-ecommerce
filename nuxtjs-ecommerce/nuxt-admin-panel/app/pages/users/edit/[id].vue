<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ویرایش کاربر : {{ user.name }}</h4>
  </div>

  <div
    v-if="errors.length > 0"
    class="alert alert-danger col-md-3 m-auto mb-4"
    role="alert"
  >
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <FormKit
    type="form"
    @submit="update"
    :incomplete-message="false"
    :actions="false"
  >
    <div class="row gy-4">
      <div class="col-md-3">
        <FormKit
          type="text"
          name="name"
          id="name"
          label="نام"
          label-class="form-label"
          :value="user.name"
          input-class="form-control"
          messages-class="form-text text-danger"
        />
      </div>

      <div class="col-md-3">
        <FormKit
          type="text"
          name="email"
          id="email"
          label="ایمیل"
          label-class="form-label"
          :value="user.email"
          input-class="form-control"
          messages-class="form-text text-danger"
          validation="required"
          :validation-messages="{ required: 'فیلد ایمیل الزامیست' }"
        />
      </div>

      <div class="col-md-3">
        <FormKit
          type="text"
          name="cellphone"
          id="cellphone"
          label="شماره تماس"
          label-class="form-label"
          :value="user.cellphone"
          input-class="form-control"
          messages-class="form-text text-danger"
          :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/i]]"
          :validation-messages="{
            required: 'فیلد شماره تماس الزامیست',
            matches: 'فیلد شماره تماس معتبر نمیباشد',
          }"
        />
      </div>

      <div class="col-md-3">
        <FormKit
          type="text"
          name="password"
          id="password"
          label="رمز عبور"
          label-class="form-label"
          input-class="form-control"
          messages-class="form-text text-danger"
        />
      </div>

      <div class="col-md-3">
        <FormKit
          type="select"
          name="is_admin"
          id="is_admin"
          label="سطح دسترسی"
          label-class="form-label"
          input-class="form-select"
          messages-class="form-text text-danger"
          :value="String(user.is_admin)"
        >
          <option value="0">کاربر عادی</option>
          <option value="1">مدیر (دسترسی به پنل ادمین)</option>
        </FormKit>
      </div>

      <FormKit type="submit" input-class="btn btn-outline-dark mt-3">
        ویرایش کاربر
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
      </FormKit>
    </div>
  </FormKit>
</template>

<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const loading = ref(false);
const errors = ref([]);
const toast = useToast();

const { data: user } = await useFetch(() => "/api/global", {
  query: { url: `/users/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

async function update(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/global", {
      method: "PUT",
      body: formData,
      query: { url: `/users/${user.value.id}` },
    });

    toast.success("ویرایش کاربر باموفقیت انجام شد");
    return navigateTo("/users");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
