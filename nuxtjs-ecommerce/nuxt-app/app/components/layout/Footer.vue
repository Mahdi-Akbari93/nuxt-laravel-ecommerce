<template>
  <footer class="footer_section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 footer-col">
          <div class="footer-brand">
            <span class="brand-badge"><i class="bi bi-lightning-charge-fill"></i></span>
            <span class="brand-name"> md-ak.ir </span>
          </div>
          <p class="footer-desc">
            فروشگاه آنلاین ما با تمرکز بر کیفیت، سرعت ارسال و تجربه‌ی خرید ساده
            برای شما طراحی شده تا هر سفارش با آرامش کامل تحویل بگیرد.
          </p>
          <div class="footer_social">
            <a href="#" @click.prevent aria-label="تلگرام" title="تلگرام">
              <i class="bi bi-telegram"></i>
            </a>
            <a href="#" @click.prevent aria-label="اینستاگرام" title="اینستاگرام">
              <i class="bi bi-instagram"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6 col-6 footer-col">
          <div class="footer-title">دسترسی سریع</div>
          <ul class="footer-quicklinks">
            <li>
              <NuxtLink class="footer-link" to="/">
                <i class="bi bi-chevron-left"></i>
                صفحه اصلی
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-link" to="/menu">
                <i class="bi bi-chevron-left"></i>
                منو
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-link" to="/about-us">
                <i class="bi bi-chevron-left"></i>
                درباره ما
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-link" to="/contact-us">
                <i class="bi bi-chevron-left"></i>
                تماس با ما
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 col-6 footer-col">
          <div class="footer-title">اطلاعات تماس</div>
          <div class="footer_contact">
            <div class="contact_link_box">
              <NuxtLink to="/contact-us">
                <i class="bi bi-geo-alt-fill"></i>
                <span> مشاهده آدرس روی نقشه </span>
              </NuxtLink>
              <a :href="`tel:${phone}`">
                <i class="bi bi-telephone-fill"></i>
                <span style="direction: ltr;">{{ phone }}</span>
              </a>
              <a :href="`mailto:${email}`">
                <i class="bi bi-envelope-fill"></i>
                <span> {{ email }} </span>
              </a>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 footer-col">
          <div class="footer-title">ساعت کاری</div>
          <div class="footer_contact">
            <div class="contact_link_box">
              <div class="contact-line">
                <i class="bi bi-calendar-check"></i>
                <span> همه‌روزه در هفته </span>
              </div>
              <div class="contact-line">
                <i class="bi bi-clock-fill"></i>
                <span> 10:00 صبح تا 12:00 شب </span>
              </div>
              <div class="contact-line">
                <i class="bi bi-truck"></i>
                <span> ارسال به تمام نقاط شهر </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p class="footer-copyright">
          © 2026 <span style="color: #e3c47f">md-ak.ir</span> | همه حقوق برای فروشگاه ما محفوظ است.
        </p>
        <button class="back-to-top" type="button" aria-label="بازگشت به بالا" @click="backToTop">
          <i class="bi bi-arrow-up"></i>
          <span>بازگشت به بالا</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const phone = "0910 000 0000";
const email = "info@md-ak.ir";

function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
