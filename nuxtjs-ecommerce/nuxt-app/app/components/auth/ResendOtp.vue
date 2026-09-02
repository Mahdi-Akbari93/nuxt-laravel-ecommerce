<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div v-if="!showResendOtp" class="otp-timer mt-0">
        <vue-countdown
          :time="10 * 1000"
          :transform="transformSlotProps"
          v-slot="{ minutes, seconds }"
          @end="onCountdown"
        >
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>

      <button  v-else @click="resend" :disabled="loading" class="btn btn-dark">
          <i class="bi bi-arrow-repeat ms-1"></i>
          ارسال دوباره
          <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useToast } from "vue-toastification";

const emit = defineEmits(["resendOtpErrors"]);
const showResendOtp = ref(false);
const toast = useToast();
const loading = ref(false);

function onCountdown() {
  showResendOtp.value = true;
}

function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

async function resend() {
  try {
    loading.value = true
    await $fetch("/api/auth/resendOtp", {
      method: "POST",
    });

    toast.success("کد ورود دوباره برای شما ارسال شد");
    showResendOtp.value = false;
  } catch (error) {
    emit("resendOtpErrors", Object.values(error.data.data.message).flat());
  }finally {
    loading.value = false
  }
}
</script>
