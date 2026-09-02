<template>
  <!-- contact section -->
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center mb-5">
        <span class="section-badge"><i class="bi bi-envelope-paper-heart"></i> ارتباط با ما</span>
        <h2>تماس <span>با ما</span></h2>
        <p>سوال یا پیشنهادی دارید؟ برای ما بنویسید، در سریع‌ترین زمان پاسخ می‌دهیم.</p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <div v-if="errors.length > 0" class="alert alert-danger mb-3">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <form @submit.prevent="send">
              <div class="mb-3">
                <label class="form-label">نام و نام خانوادگی</label>
                <input
                  type="text"
                  v-model="formData.name"
                  class="form-control"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">ایمیل</label>
                <input
                  type="email"
                  v-model="formData.email"
                  class="form-control"
                  placeholder="example@mail.com"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">موضوع پیام</label>
                <input
                  type="text"
                  v-model="formData.subject"
                  class="form-control"
                  placeholder="موضوع پیام را بنویسید"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">متن پیام</label>
                <textarea
                  rows="5"
                  v-model="formData.text"
                  style="min-height: 120px"
                  class="form-control"
                  placeholder="پیام خود را بنویسید..."
                ></textarea>
              </div>
              <div class="btn_box">
                <button type="submit" class="btn-brand" :disabled="loading">
                  ارسال پیام
                  <i class="bi bi-send ms-1"></i>
                  <div
                    v-if="loading"
                    class="spinner-border spinner-border-sm ms-2"
                  ></div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container">
            <div id="map" style="height: 345px"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end contact section -->
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();

const errors = ref([]);
const loading = ref(false);
const {
  public: { apiBase },
} = useRuntimeConfig();

const { $leaflet } = useNuxtApp();
const formData = reactive({
  name: "",
  email: "",
  subject: "",
  text: "",
});

async function send() {
  if (
    formData.name === "" ||
    formData.email === "" ||
    formData.subject === "" ||
    formData.text === ""
  ) {
    toast.error("تمام موارد فرم تماس با ما الزامی است");
    return;
  }
  try {
    loading.value = true;
    errors.value = [];
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: "POST",
      body: formData,
    });

    toast.success("پیام شما با موفقیت ثبت شد");
  } catch (err) {
    errors.value = Object.values(err.data.message).flat();
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  let map = $leaflet.map("map").setView([35.700105, 51.400394], 14);
  let tiles = $leaflet
    .tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      },
    )
    .addTo(map);
  let marker = $leaflet
    .marker([35.700105, 51.400394] , {
      icon: $leaflet.icon({
        popupAnchor: [12 , 6],
        iconUrl: 'images/map/marker-icon.png',
        shadowUrl: 'images/map/marker-shadow.png'
      })
    }).addTo(map)
    .bindPopup("<b>md-ak.ir</b><br />درباره ما و تماس با فروشگاه")
    .openPopup();
});
</script>
