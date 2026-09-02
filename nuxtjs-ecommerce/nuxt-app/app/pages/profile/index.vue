<template>
  <div class="page-card vh-70">
    <div class="heading_container mb-4">
      <span class="section-badge"><i class="bi bi-person-gear"></i> اطلاعات حساب</span>
      <h5 class="fw-bold mb-0" style="font-size: 1.1rem">ویرایش اطلاعات کاربری</h5>
    </div>

    <div v-if="errors.length > 0" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <FormKit
      type="form"
      :actions="false"
      :incomplete-message="false"
      @submit="edit"
    >
      <div class="row g-4">
        <div class="col col-md-6">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="نام و نام خانوادگی"
            label-class="form-label"
            input-class="form-control"
            validation="required"
            :validation-messages="{
              required: ' فیلد نام و نام خانوادگی الزامیست',
            }"
            message-class="form-text text-danger"
            :value="user.name"
          ></FormKit>
        </div>

        <div class="col col-md-6">
          <FormKit
            type="email"
            name="email"
            id="name"
            label="ایمیل"
            label-class="form-label"
            input-class="form-control"
            validation="required | email"
            :validation-messages="{
              required: ' فیلد ایمیل الزامیست',
              email: 'فرمت فیلد معتبر نیست',
            }"
            message-class="form-text text-danger"
            :value="user.email"
          ></FormKit>
        </div>

        <div class="col col-md-6">
          <label class="form-label">شماره تلفن</label>
          <div class="input-group">
            <span class="input-group-text ig-plain">
              <i class="bi bi-phone"></i>
            </span>
            <input
              type="text"
              disabled
              class="form-control"
              :value="user.cellphone"
            />
          </div>
        </div>

        <div class="col-12">
          <FormKit type="submit" input-class="btn btn-primary mt-3"
            >ویرایش اطلاعات
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"
            ></div>
          </FormKit>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const { data: user } = await useFetch("/api/profile/info", {
  headers: useRequestHeaders(["cookie"]),
});

async function edit(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/profile/info/edit", {
      method: "POST",
      body: formData,
    });

    toast.success("ویرایش اطلاعات شما باموفقیت انجام شد");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
