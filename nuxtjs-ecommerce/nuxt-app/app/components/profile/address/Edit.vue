<template>
  <div>
      <FormKit
        type="form"
        :actions="false"
        #default="{ value }"
        :incomplete-message="false"
        @submit="edit"
      >
        <div class="page-card">
          <div v-if="errors.length > 0" class="alert alert-danger">
            <ul class="mb-0">
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="row g-4">
            <div class="col col-md-6">
              <FormKit
                type="text"
                name="title"
                id="title"
                label="عنوان"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :validation-messages="{
                  required: ' فیلد عنوان الزامیست',
                }"
                message-class="form-text text-danger"
                :value="props.address.title"
              ></FormKit>
            </div>

            <div class="col col-md-6">
              <FormKit
                type="text"
                name="cellphone"
                id="cellphone"
                label="شماره تماس"
                label-class="form-label"
                input-class="form-control"
                :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
                :validation-messages="{
                  required: ' فیلد شماره تماس الزامیست',
                  matches: 'شماره تماس معتبر نمیباشد',
                }"
                message-class="form-text text-danger"
                :value="props.address.cellphone"
              ></FormKit>
            </div>

            <div class="col col-md-6">
              <FormKit
                type="text"
                name="postal_code"
                id="postal_code"
                label="کد پستی"
                label-class="form-label"
                input-class="form-control"
                :validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
                :validation-messages="{
                  required: ' فیلد کد پستی الزامیست',
                  matches: 'فیلد کدپستی معتبر نمیباشد',
                }"
                message-class="form-text text-danger"
                :value="props.address.postal_code"
              ></FormKit>
            </div>



            <ClientOnly fallback-tag="span" fallback="درحال بارگذاری ...">

            <div class="col col-md-6">
              <FormKit
                @change="changeProvince"
                type="select"
                name="province_id"
                id="province_id"
                label="استان"
                label-class="form-label"
                input-class="form-select"
                validation="required"
                :validation-messages="{
                  required: ' فیلد استان الزامیست',
                }"
                message-class="form-text text-danger"
                :value="props.address.province_id"
              >
                <option
                  v-for="province in props.provinces"
                  :key="province.id"
                  :value="province.id"
                >
                  {{ province.name }}
                </option>
              </FormKit>
            </div>

            <div class="col col-md-6">
              <FormKit
                ref="cityEl"
                type="select"
                name="city_id"
                id="city_id"
                label="شهر"
                label-class="form-label"
                input-class="form-select"
                validation="required"
                :validation-messages="{
                  required: ' فیلد شهر الزامیست',
                }"
                message-class="form-text text-danger"
                :value="props.address.city_id"
              >
                <option
                  v-for="city in props.cities.filter(
                    (item) => item.province_id == value.province_id,
                  )"
                  :key="city.id"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </FormKit>
            </div>

            </ClientOnly>


            <div class="col col-md-12">
              <FormKit
                type="textarea"
                name="address"
                rows="5"
                id="address"
                label="آدرس"
                label-class="form-label"
                input-class="form-control"
                validation="required"
                :validation-messages="{
                  required: ' فیلد آدرس الزامیست',
                }"
                message-class="form-text text-danger"
                :value="props.address.address"
              ></FormKit>
            </div>
          </div>

          <div>
            <div class="d-flex justify-content-between mt-4 flex-wrap gap-3">

                <FormKit type="submit" input-class="btn btn-primary"
                >ذخیره تغییرات
                <div
                    v-if="loading"
                    class="spinner-border spinner-border-sm ms-2"
                ></div>
                </FormKit>
                <ProfileAddressDelete :addressId="props.address.id"></ProfileAddressDelete>
            </div>
          </div>
        </div>
    </FormKit>
    
    <hr />
  </div>
</template>

<script setup>

import { useToast } from "vue-toastification";

const props = defineProps(["address","provinces", "cities"]);
const cityEl = ref(null);
const errors = ref([]);
const loading = ref(false);
const toast = useToast();


function changeProvince(el) {
  cityEl.value.node.input(
    props.cities.find((item) => item.province_id == el.target.value).id,
  );
}

async function edit(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/profile/addresses/edit", {
      method: "POST",
      body: {...formData , address_id: props.address.id},
    });

    toast.success("ویرایش آدرس باموفقیت انجام شد");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}

</script>
