<template>
    <button @click="deleteUser" :disabled="loading" class="btn btn-delete">حذف
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
</template>


<script setup>
import {useToast} from "vue-toastification";



const props = defineProps(['userId'])
const loading = ref(false)
const toast = useToast()

async function deleteUser(){
    try{

        loading.value = true
        await $fetch('/api/global' , {
            method: 'DELETE',
            query: {url: `/users/${props.userId}`},
            // headers: useRequestHeaders(["cookie"])
        })

        toast.warning("حذف کاربر باموفقیت انجام شد")

        return navigateTo('/users')
    }catch(error){
        toast.error(errorText(error) ?? "حذف کاربر با خطا مواجه شد")
    }finally{
        loading.value = false
    }
}
</script>