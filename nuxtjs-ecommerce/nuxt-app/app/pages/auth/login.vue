<template>
  <!-- login section -->
  <section class="auth_section">
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-6 col-lg-5 offset-md-3 offset-lg-4">
          <div class="auth-card">
            <div class="card-body">
              <div class="text-center mb-4">
                <span class="auth-icon"><i class="bi bi-fingerprint"></i></span>
                <h4 class="fw-bold mb-1">ورود به حساب</h4>
                <p class="mb-0" style="font-size: 0.88rem">
                  برای ادامه، شماره موبایل خود را وارد کنید.
                </p>
              </div>
              <AuthCheckOtp v-if="showOtpForm"></AuthCheckOtp>
              <AuthLogin v-else @show-check-otp-form="() => showOtpForm = true"></AuthLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end login section -->
</template>


<script setup>

definePageMeta({
  middleware: 'guest'
})

const showOtpForm = ref(false)

</script>
