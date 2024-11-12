<template>
  <div class="flex flex-col space-y-2">
    <label :for="fieldId" class="text-bodytext text-sm">
      {{ label }}
    </label>

    <div v-if="!filePreview" class="w-full">
      <!-- File Upload -->
      <input
        :id="fieldId"
        :accept="fileType"
        type="file"
        @change="handleFileUpload"
        class="hidden"
        v-if="allowUpload"
      />
      <label
        v-if="allowUpload"
        :for="fieldId"
        class="w-full focus:none px-2.5 py-2 flex space-x-2 items-center whitespace-nowrap cursor-pointer border border-gray-300 outline-none text-sm font-medium text-primary rounded-lg"
      >
        <img src="~/assets/images/scan-user.svg" alt="" />
        <p>{{ uploadButtonText }}</p>
      </label>

      <!-- Camera Capture -->
      <div v-if="allowCapture" class="w-full flex justify-center items-center">
        <button
          @click="
            showModal = true;
            startCamera();
          "
          type="button"
          class="w-full focus:none px-2.5 py-2 flex space-x-2 items-center whitespace-nowrap cursor-pointer border border-gray-300 outline-none text-sm font-medium text-primary rounded-lg"
        >
          <img src="~/assets/images/scan-user.svg" alt="" />
          <p>{{ captureButtonText }}</p>
        </button>
      </div>
    </div>

    <!-- File/Image Preview -->
    <div v-else class="w-full flex items-center">
      <div
        class="focus:none px-2.5 py-2 flex space-x-10 items-center whitespace-nowrap cursor-pointer outline-none text-sm font-medium text-primary rounded-lg"
      >
        <img
          v-if="type === 'image'"
          :src="filePreview"
          alt=""
          class="w-10 h-10 rounded-lg"
        />
        <div v-if="allowUpload" class="">
          <input
            :id="fieldId"
            :accept="type === 'image' ? 'image/*' : 'application/pdf'"
            type="file"
            @change="handleFileUpload"
            class="hidden"
          />
          <label :for="fieldId" class="flex space-x-2 items-center">
            <img src="~/assets/images/scan-user.svg" alt="" />
            <p>Upload File</p>
          </label>
        </div>
        <div
          v-if="allowCapture"
          class="w-full flex justify-center items-center"
        >
          <button
            @click="
              showModal = true;
              startCamera();
            "
            type="button"
            class="flex space-x-2 items-center"
          >
            <img src="~/assets/images/scan-user.svg" alt="" />
            <p>{{ captureButtonText }}</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <span class="text-red-500" v-if="error">{{ error }}</span>
  </div>

  <!-- Camera Capture Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-10 w-96 flex flex-col space-y-8">
      <div class="relative">
        <!-- Show the captured image or the video feed -->
        <div v-if="!imageCaptured">
          <div class="absolute inset-0 flex items-center justify-center z-10">
            <svg
              class="w-32 h-32 text-blue-500 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
            </svg>
          </div>
          <video ref="video" class="w-full rounded-lg" autoplay></video>
          <!-- Hidden Canvas for Image Capture -->
          <canvas ref="canvas" class="hidden"></canvas>
        </div>
        <div v-else>
          <img
            :src="filePreview"
            alt="Captured Image"
            class="w-full rounded-lg"
          />
        </div>
      </div>
      <p class="text-center mt-4 text-sm text-gray-500">
        Raise your head up straight and position your face in front of the
        camera for capturing
      </p>
      <div v-if="!imageCaptured">
        <button
          @click="captureImage"
          class="w-full bg-primary text-white mt-4 py-2 rounded-full font-semibold"
        >
          Capture
        </button>
      </div>
      <div v-else>
        <button
          @click="uploadImage"
          type="button"
          class="w-full bg-primary text-white mt-4 py-2 rounded-full font-semibold"
        >
          Upload
        </button>
        <button
          @click="recaptureImage"
          type="button"
          class="w-full text-primary border border-primary mt-2 py-2 rounded-full font-semibold"
        >
          Recapture
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from "~/stores/common";
const commonStore = useCommonStore();
import * as Yup from "yup";

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "image",
  },
  allowUpload: {
    type: Boolean,
    default: true,
  },
  allowCapture: {
    type: Boolean,
    default: false,
  },
  uploadButtonText: {
    type: String,
    default: "Upload File",
  },
  captureButtonText: {
    type: String,
    default: "Capture Image",
  },
  required: {
    type: Boolean,
    default: false,
  },
  previewUrl: {
    type: String,
    default: null,
  },
  fileName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:file", "validation"]);

const fieldId = `file-upload-${
  props.label ? props.label.replace(/\s+/g, "-").toLowerCase() : "default-id"
}`;
const file = ref(null);
const filePreview = ref(props.previewUrl || null);
const error = ref("");
const fileName = ref(props.fileName || "");
const isCapturing = ref(false);
const video = ref(null);
const canvas = ref(null);
const showModal = ref(false);
const imageCaptured = ref(false);
const loading = ref(false);

const fileType = props.type === "image" ? "image/*" : "application/pdf";

// Start the camera
function startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.value.srcObject = stream;
      isCapturing.value = true;
    });
  }
}

// Capture image
function captureImage() {
  if (canvas.value && video.value) {
    const context = canvas.value.getContext("2d");
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(
      video.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    const imageDataUrl = canvas.value.toDataURL("image/png");
    filePreview.value = imageDataUrl;
    file.value = dataURLtoFile(imageDataUrl, "capture.png");
    imageCaptured.value = true;
    stopCamera();
  }
}

// Stop camera
function stopCamera() {
  if (video.value && video.value.srcObject) {
    let stream = video.value.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    video.value.srcObject = null;
    isCapturing.value = false;
  }
}

// Recapture image
function recaptureImage() {
  imageCaptured.value = false;
  filePreview.value = null;
  startCamera();
}

// Upload image
async function uploadImage() {
  emit("update:file", file.value);
  emit("validation", validateField());
  showModal.value = false;

  // Upload the captured image
  await uploadFile(file.value);
}

// Convert data URL to File object
function dataURLtoFile(dataUrl, filename) {
  let arr = dataUrl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Handle file upload
async function handleFileUpload(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    filePreview.value = URL.createObjectURL(selectedFile);
    emit("update:file", file.value);
    emit("validation", validateField());

    // Upload the file
    await uploadFile(file.value);
  }
}

// Validate the field
function validateField() {
  let schema = Yup.mixed();
  if (props.required) {
    schema = schema.required("This field is required");
  }

  return schema.isValidSync(file.value);
}

watch(filePreview, (newVal) => {
  if (newVal === null) {
    file.value = null;
  }
});

watch(
  () => props.previewUrl,
  (newUrl) => {
    if (newUrl) {
      filePreview.value = newUrl;
    }
  },
  { immediate: true }
);

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    loading.value = true;
    const response = await commonStore.uploadFile(formData);
    if (response) {
    } else {
      console.error("failed");
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error.message);
  } finally {
    loading.value = false;
  }
};
</script>
