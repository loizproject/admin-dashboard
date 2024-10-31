<template>
  <div
    class="flex flex-col space-y-5 mx-8 md:mx-40 lg:mx-60 bg-white -mt-28 p-8 rounded-2xl shadow-md mb-20"
  >
    <h1 class="text-xl font-semibold text-header">Send a message</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col my-8 space-y-5">
      <div class="md:flex md:space-x-5 items-center">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter First Name"
          v-model="formData.firstName"
          :error="errors.firstName"
          required
          class="w-full"
        />
        <Input
          class="w-full mt-5 md:mt-0"
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          v-model="formData.lastName"
          :error="errors.lastName"
          required
        />
      </div>
      <div class="md:flex md:space-x-5 items-center">
        <Input
          type="number"
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter Phone Number"
          v-model="formData.phoneNumber"
          :error="errors.phoneNumber"
          required
          class="w-full"
        />
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
          v-model="formData.email"
          :error="errors.email"
          required
          class="w-full mt-5 md:mt-0"
        />
      </div>
      <Textarea
        type="text"
        name="description"
        v-model="formData.description"
        :error="errors.description"
        label="Message"
        placeholder="Enter Message"
        required
        class="w-full"
      />
      <div class="flex w-52 self-center">
        <Button
          type="submit"
          size="md"
          label="Submit"
          :kind="isFormValid ? 'primary-round' : 'disabled-round'"
          class="w-full"
          :loading="loading"
          :disabled="!isFormValid"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import Input from "~/components/form/InputField.vue";
import Textarea from "~/components/form/Textarea.vue";
import Button from "~/components/buttons/BasicButton.vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  description: "",
});

const schema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#.]/,
      "Password must contain at least one special character"
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const { errors, validate } = useForm({
  validationSchema: schema,
  initialValues: formData,
});

const loading = ref(false);

const isFormValid = computed(() => {
  return (
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    formData.firstName &&
    formData.lastName &&
    formData.email
  );
});

const handleSubmit = async () => {
  //   const isValid = await validate();
  //   if (isValid) {
  //     const payload = {
  //       first_name: formData.firstName,
  //       last_name: formData.lastName,
  //       email: formData.email,
  //       password: formData.password,
  //     };
  //     try {
  //       loading.value = true;
  //       const response = await authStore.register(payload);
  //       if (response) {
  //         authStore.setEmail(formData.email);
  //         router.push("/auth/verify");
  //       } else {
  //         console.error("Registration failed");
  //       }
  //     } catch (error) {
  //       console.error("An unexpected error occurred:", error.message);
  //     } finally {
  //       loading.value = false;
  //     }
  //   }
};
</script>
