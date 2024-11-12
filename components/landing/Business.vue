<template>
  <div id="about-us">
    <div
      class="px-6 md:px-10 lg:px-16 py-10 md:py-16 md:flex md:justify-between md:space-x-10 items-center bg-[#F9F9F9]"
    >
      <div class="space-y-6 md:w-[50%] w-full">
        <div class="flex flex-col space-y-3">
          <p
            class="text-primary py-1.5 w-32 text-sm flex justify-center border border-[#DCDCDC] rounded-full"
          >
            For Businesses
          </p>
          <h1 class="text-header font-semibold text-3xl">For Businesses</h1>
        </div>

        <div class="text-bodytext3 space-y-3">
          <p>
            It goes beyond normal transactions. Build a relationship with your
            customers by gaining their trust and get connected to more customers
            beyond your imagination.
          </p>
        </div>
        <div>
          <nuxt-link to="/about">
            <button
              class="border border-primary text-primary flex space-x-1 px-5 py-2 rounded-full"
            >
              <p>Learn More</p>
              <p>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7556 11.1L10.928 6.27236L12.2006 4.99976L19.2008 12L12.2006 19.0002L10.928 17.7276L15.7556 12.9H4.80078V11.1H15.7556Z"
                    fill="#008565"
                  />
                </svg>
              </p>
            </button>
          </nuxt-link>
        </div>
      </div>
      <div class="md:w-[50%] mt-6 md:mt-0 w-full mx-auto">
        <img src="~/assets/images/business-img.png" alt="" />
      </div>
    </div>
  </div>
</template>
