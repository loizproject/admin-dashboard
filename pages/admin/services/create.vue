<template>
  <div class="p-6 text-header min-h-screen">
    <div class="flex justify-between items-center">
      <div class="space-y-4">
        <h1 class="text-2xl">Create Service</h1>
        <p class="text-sm">Create a service and publish on your website.</p>
      </div>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="my-8 space-y-4 bg-white rounded-xl p-6"
    >
      <Input
        type="text"
        name="serviceName"
        v-model="formData.serviceName"
        label="Service Name"
        :error="errors.serviceName"
        required
        class="w-full"
      />
      <Textarea
        type="text"
        name="description"
        v-model="formData.description"
        :error="errors.description"
        label="Description"
        required
        class="w-full"
      />
      <Button
        type="submit"
        size="md"
        label="Next"
        :kind="isFormValid ? 'primary-round' : 'disabled-round'"
        class="w-full mt-8 mb-4"
        :loading="loading"
        :disabled="!isFormValid"
      />
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import Input from "~/components/form/InputField.vue";
import Textarea from "~/components/form/Textarea.vue";
import Button from "~/components/buttons/BasicButton.vue";
import { useServicesStore } from "~/stores/services";
const serviceStore = useServicesStore();

const formData = reactive({
  serviceName: "",
  description: "",
});
const loading = ref(false);
const router = useRouter();
const schema = Yup.object({
  serviceName: Yup.string().required("Service Name is required"),
  description: Yup.string().required("Description is required"),
});

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: formData,
});

const isFormValid = computed(() => {
  return (
    !errors.serviceName &&
    formData.serviceName &&
    !errors.description &&
    formData.description
  );
});

const handleSubmit = async () => {
  const isValid = await validate();
  if (isFormValid && isValid) {
    const payload = {
      title: formData.serviceName,
      description: formData.description,
    };
    try {
      loading.value = true;
      const response = await serviceStore.addService(payload);
      if (response) {
        router.push("/admin/services");
      } else {
        console.error("Verification failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
    } finally {
      loading.value = false;
    }
  }
};
</script>
