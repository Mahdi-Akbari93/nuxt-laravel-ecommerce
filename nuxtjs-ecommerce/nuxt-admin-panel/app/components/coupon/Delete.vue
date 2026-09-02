<template>
    <button @click="deleteCoupon" :disabled="loading" class="btn btn-delete">حذف
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
</template>


<script setup>
import {useToast} from "vue-toastification";



const props = defineProps(['couponId'])
const loading = ref(false)
const toast = useToast()

async function deleteCoupon(){
    try{

        loading.value = true
        await $fetch('/api/global' , {
            method: 'DELETE',
            query: {url: `/coupons/${props.couponId}`},
            // headers: useRequestHeaders(["cookie"])
        })

        toast.warning("حذف تخفیف باموفقیت انجام شد")

        return navigateTo('/coupons')
    }catch(error){
        toast.error(errorText(error) ?? "حذف تخفیف با خطا مواجه شد")
    }finally{
        loading.value = false
    }
}
</script>