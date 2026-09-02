<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ایجاد محصول</h4>
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

  <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
    <FormKit
      type="form"
      @submit="create"
      :incomplete-message="false"
      :actions="false"
    >
      <div class="row gy-4">
        <ProductPrimaryImage
          @set-primary-image="(image) => (primaryImage = image)"
        />

        <div class="col-md-3">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="نام"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد نام الزامیست' }"
          />
        </div>

        <div class="col-md-3">
          <FormKit
            type="select"
            name="category_id"
            id="category_id"
            label="دسته بندی"
            label-class="form-label"
            input-class="form-select"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد دسته بندی الزامیست' }"
          >
            <option
              v-for="category in categories.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </FormKit>
        </div>

        <div class="col-md-3">
          <FormKit
            type="select"
            name="status"
            id="status"
            label="وضعیت"
            label-class="form-label"
            input-class="form-select"
            value="1"
            messages-class="form-text text-danger"
          >
            <option value="1" selected>فعال</option>
            <option value="0">غیرفعال</option>
          </FormKit>
        </div>

        <div class="col-md-3">
          <FormKit
            type="text"
            name="price"
            id="price"
            label="قیمت"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required|number"
            :validation-messages="{
              required: 'فیلد قیمت الزامیست',
              number: 'مقدار قیمت باید عددی باشد',
            }"
          />
        </div>

        <div class="col-md-3">
          <FormKit
            type="text"
            name="quantity"
            id="quantity"
            label="تعداد"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required|number"
            :validation-messages="{
              required: 'فیلد تعداد الزامیست',
              number: 'مقدار تعداد باید عددی باشد',
            }"
          />
        </div>

        <div class="col-md-3">
          <FormKit
            type="text"
            name="sale_price"
            id="sale_price"
            label="قیمت حراجی"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="number"
            :validation-messages="{ number: 'مقدار قیمت حراجی باید عددی باشد' }"
          />
        </div>

        <div class="col-md-3">
          <label class="form-label">تاریخ شروع حراجی</label>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-clock"></i></span>
            <input
              type="text"
              class="form-control"
              id="sale-date-from-picker"
            />
          </div>

          <date-picker
            v-model="saleDateFrom"
            type="datetime"
            display-format="HH:mm jYYYY-jMM-jDD"
            format="YYYY-MM-DD HH:mm:ss"
            custom-input="#sale-date-from-picker"
          />
        </div>

        <div class="col-md-3">
          <label class="form-label">تاریخ پایان حراجی</label>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-clock"></i></span>
            <input type="text" class="form-control" id="sale-date-to-picker" />
          </div>

          <date-picker
            v-model="saleDateTo"
            type="datetime"
            display-format="HH:mm jYYYY-jMM-jDD"
            format="YYYY-MM-DD HH:mm:ss"
            custom-input="#sale-date-to-picker"
          />
        </div>

        <div class="col-md-3">
          <label for="images" class="form-label">تصاویر</label>
          <input
            @change="imagesFile"
            class="form-control"
            type="file"
            id="images"
            multiple
          />
        </div>

        <div class="col-md-12">
          <FormKit
            type="textarea"
            rows="5"
            name="description"
            id="description"
            label="توضیحات"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد توضیحات الزامیست' }"
          />
        </div>

        <FormKit type="submit" input-class="btn btn-outline-dark mt-3 mb-5">
          ایجاد محصول
          <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
        </FormKit>
      </div>
    </FormKit>
  </ClientOnly>
</template>

<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  middleware: "auth",
});

const loading = ref(false);
const errors = ref([]);
const toast = useToast();

const primaryImage = ref(null);
const saleDateFrom = ref(null);
const saleDateTo = ref(null);
const images = ref(null);

const { data: categories } = await useFetch("/api/global", {
  query: { url: "/categories" },
  headers: useRequestHeaders(["cookie"]),
});

function imagesFile(el) {
  images.value = el.target.files;
}

async function create(data) {
  if (!primaryImage.value) {
    toast.error("فیلد تصویر اصلی الزامیست");
    return;
  }

  const formData = new FormData();

  for (let index = 0; index < images.value.length; index++) {
    formData.append("images", images.value[index]);
  }

  formData.append("primary_image", primaryImage.value);
  formData.append("name", data.name);
  formData.append("category_id", data.category_id);
  formData.append("status", data.status);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("sale_price", data.sale_price);
  formData.append("date_on_sale_from", saleDateFrom.value);
  formData.append("date_on_sale_to", saleDateTo.value);
  formData.append("description", data.description);

  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/products/create", {
      method: "POST",
      body: formData,
    });

    toast.success("ایجاد محصول باموفقیت انجام شد");
    return navigateTo("/products");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
