<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ویرایش محصول</h4>
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
      @submit="edit"
      :incomplete-message="false"
      :actions="false"
    >
      <div class="row gy-4">
        <ProductPrimaryImage
          :primary-image="product.primary_image"
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
            :value="product.name"
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
            :value="product.category_id"
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
            :value="product.status_value"
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
            :value="product.price"
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
            :value="product.quantity"
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
            :value="product.sale_price"
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
              :placeholder="product.date_on_sale_from_jalali"
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
            <input
              type="text"
              :placeholder="product.date_on_sale_to_jalali"
              class="form-control"
              id="sale-date-to-picker"
            />
          </div>

          <date-picker
            v-model="saleDateTo"
            type="datetime"
            display-format="HH:mm jYYYY-jMM-jDD"
            format="YYYY-MM-DD HH:mm:ss"
            custom-input="#sale-date-to-picker"
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
            :value="product.description"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد توضیحات الزامیست' }"
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
          <img
            v-for="image in product.images"
            class="me-3"
            :src="image.image"
            width="300"
          />
        </div>

        <FormKit type="submit" input-class="btn btn-outline-dark mt-3 mb-5">
          ویرایش محصول
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
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
const route = useRoute();

const { data: categories } = await useFetch("/api/global", {
  query: { url: "/categories" },
  headers: useRequestHeaders(["cookie"]),
});

const { data: product } = await useFetch("/api/global", {
  query: { url: `/products/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

function imagesFile(el) {
  images.value = el.target.files;
}

async function edit(data) {
  const formData = new FormData();

  if (images.value) {
    for (let index = 0; index < images.value.length; index++) {
      formData.append("images", images.value[index]);
    }
  } else {
    formData.append("images", null);
  }

  formData.append(
    "primary_image",
    primaryImage.value ? primaryImage.value : null,
  );
  formData.append("name", data.name);
  formData.append("category_id", data.category_id);
  formData.append("status", data.status);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("sale_price", data.sale_price ? data.sale_price : 0);

  const checkDateFrom = saleDateFrom.value
    ? saleDateFrom.value
    : product.value.date_on_sale_from;

  formData.append(
    "date_on_sale_from",
    checkDateFrom ? checkDateFrom : "",
  );

  const checkDateTo = saleDateTo.value
    ? saleDateTo.value
    : product.value.date_on_sale_to;

  formData.append(
    "date_on_sale_to",
    checkDateTo ? checkDateTo : "",
  );

  formData.append("description", data.description);

  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/products/edit", {
      method: "PUT",
      body: formData,
      query: { url: `/products/${product.value.id}` },
    });

    toast.success("ویرایش محصول باموفقیت انجام شد");
    return navigateTo("/products");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
