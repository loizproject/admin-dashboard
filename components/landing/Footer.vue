<template>
  <div
    id="contact-us"
    class="flex flex-col space-y-4 px-6 md:px-10 lg:px-24 py-16 md:py-24 pt-16 pb-4 bg-primary"
  >
    <div
      class="lg:flex lg:justify-between text-white pb-4 text-center md:text-start space-y-8 lg:space-y-0"
    >
      <div class="flex flex-col space-y-2">
        <img
          src="~/assets/images/whitelogo.svg"
          alt="Logo"
          class="w-40 self-center md:self-start"
        />
        <p class="lg:w-[230px] font-medium">
          Creating a safe & secure online shopping experience
        </p>
      </div>
      <div class="flex flex-col space-y-4">
        <h1 class="text-white font-medium text-2xl">Solution</h1>
        <p class="text-sm">ID Verification</p>
        <p class="text-sm">Ratings</p>
        <p class="text-sm">Reviews</p>
      </div>
      <div class="flex flex-col space-y-4">
        <h1 class="text-white font-medium text-2xl">Company</h1>
        <nuxt-link to="/about"><p class="text-sm">About Us</p></nuxt-link>
        <nuxt-link to="/contact"><p class="text-sm">Contact Us</p></nuxt-link>
      </div>
      <div class="flex flex-col space-y-4 lg:items-end">
        <h1 class="text-white font-medium text-2xl">Join Amnid</h1>
        <nuxt-link to="/auth/signup">
          <p class="text-sm">Register</p></nuxt-link
        >
        <nuxt-link to="/auth/login"> <p class="text-sm">Login</p></nuxt-link>
        <p class="text-sm">Careers</p>
        <div
          class="flex space-x-6 items-center justify-center md:justify-start"
        >
          <a
            href="https://www.instagram.com/amnidafrica?igsh=MnFqNm9rbXcxajU4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z"
                fill="white"
              />
              <path
                d="M20.2008 9.17499H11.8008C10.3424 9.17499 9.17578 10.3417 9.17578 11.8V20.2C9.17578 21.6583 10.3424 22.825 11.8008 22.825H20.2008C21.6591 22.825 22.8258 21.6583 22.8258 20.2V11.8C22.8258 10.3417 21.6591 9.17499 20.2008 9.17499ZM20.9591 10.75H21.2508V13.0833H18.9175V10.75H20.9591ZM14.0758 14.6C14.4841 14.0167 15.2425 13.6083 16.0008 13.6083C16.7591 13.6083 17.5175 14.0167 17.9258 14.6C18.2175 15.0083 18.3925 15.475 18.3925 16C18.3925 17.3416 17.2841 18.3917 16.0008 18.3917C14.7175 18.3917 13.6091 17.3417 13.6091 16C13.6091 15.475 13.7841 15.0083 14.0758 14.6ZM21.4841 20.2C21.4841 20.9 20.9008 21.4833 20.2008 21.4833H11.8008C11.1008 21.4833 10.5174 20.9 10.5174 20.2V14.6H12.5591C12.3841 15.0083 12.2675 15.5333 12.2675 16C12.2675 18.0417 13.9591 19.7333 16.0008 19.7333C18.0424 19.7333 19.7341 18.0417 19.7341 16C19.7341 15.5333 19.6174 15.0083 19.4425 14.6H21.4841L21.4841 20.2Z"
                fill="#008565"
              /></svg
          ></a>
          <a
            href="https://x.com/amnidafrica"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.26875 2 2 8.26875 2 16C2 23.7313 8.26875 30 16 30C23.7313 30 30 23.7313 30 16C30 8.26875 23.7313 2 16 2ZM22.7281 12.5531C22.7375 12.7 22.7375 12.8531 22.7375 13.0031C22.7375 17.5906 19.2437 22.875 12.8594 22.875C10.8906 22.875 9.06562 22.3031 7.52812 21.3188C7.80937 21.35 8.07813 21.3625 8.36563 21.3625C9.99063 21.3625 11.4844 20.8125 12.675 19.8813C11.15 19.85 9.86875 18.85 9.43125 17.475C9.96562 17.5531 10.4469 17.5531 10.9969 17.4125C10.2116 17.253 9.50586 16.8265 8.99943 16.2056C8.49299 15.5846 8.21715 14.8075 8.21875 14.0063V13.9625C8.67812 14.2219 9.21875 14.3812 9.78438 14.4031C9.30888 14.0862 8.91893 13.6569 8.6491 13.1532C8.37926 12.6495 8.23789 12.087 8.2375 11.5156C8.2375 10.8687 8.40625 10.2781 8.70938 9.76562C9.58095 10.8386 10.6685 11.7161 11.9015 12.3411C13.1344 12.9662 14.485 13.3249 15.8656 13.3938C15.375 11.0344 17.1375 9.125 19.2563 9.125C20.2563 9.125 21.1562 9.54375 21.7906 10.2188C22.575 10.0719 23.325 9.77812 23.9937 9.38437C23.7344 10.1875 23.1906 10.8656 22.4688 11.2937C23.1688 11.2188 23.8438 11.025 24.4688 10.7531C23.9969 11.4469 23.4062 12.0625 22.7281 12.5531Z"
                fill="white"
              /></svg
          ></a>
        </div>
      </div>
    </div>
    <hr />
    <div
      class="text-white md:flex md:justify-between items-center space-y-4 md:space-y-0 text-center md:text-start"
    >
      <div
        class="flex space-x-8 items-center text-sm justify-center md:justify-start cursor-pointer"
      >
        <a
          href="https://docs.google.com/document/d/1tpBKeeI1uDAj6lSOFtlXIs6o3hbPhcEBdo3egSIkgLs/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          >Terms and Conditions</a
        >
      </div>
      <p class="text-xs">©All Rights Reserved Amnid 2022</p>
    </div>
  </div>
</template>
<script setup></script>
