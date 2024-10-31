<template>
    <div class="flex flex-col py-10">
      <h1 class="text-2xl md:text-3xl lg:4xl font-semibold text-header">Login</h1>
  
      <form @submit.prevent="handleSubmit" class="flex flex-col my-8 space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          v-model="formData.email"
          :error="errors.email"
          required
        />
        <PasswordField
          name="password"
          placeholder="Enter Password"
          v-model="formData.password"
          :error="errors.password"
          required
        />
  
        <div class="flex space-x-2 self-end w-full">
          <Button
            type="submit"
            size="lg"
            label="LogIn"
            :kind="isFormValid ? 'primary-square' : 'disabled-square'"
            class="w-full"
            
            :loading="loading"
            :disabled="!isFormValid"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "auth",
  });
  import { useForm } from "vee-validate";
  import * as Yup from "yup";
  import Input from "~/components/form/InputField.vue";
  import Button from "~/components/buttons/BasicButton.vue";
  import PasswordField from "~/components/form/PasswordField.vue";
  import { useAuthStore } from "~/stores/auth";
  const authStore = useAuthStore();
  
  const router = useRouter();
  const formData = reactive({
    email: "",
    password: "",
  });
  const loading = ref(false);
  
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  
  const { errors, validate } = useForm({
    validationSchema: schema,
    initialValues: formData,
  });
  
  const isFormValid = computed(() => {
    return (
      !errors.email && !errors.password && formData.email && formData.password
    );
  });
  
  const handleSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      console.log(payload);
      try {
        loading.value = true;
        const response = await authStore.login(payload);
        if (response) {
          router.push("/dashboards");
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error.message);
      } finally {
        loading.value = false;
      }
    }
  };
  </script>
  