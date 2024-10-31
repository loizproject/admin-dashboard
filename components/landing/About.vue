<template>
  <div id="about-us">
    <div
      class="px-6 md:px-10 lg:px-24 py-16 md:flex md:justify-between md:space-x-10 bg-[#F9F9F9]"
    >
      <div class="md:w-[50%]">
        <img src="~/assets/images/about-img.png" alt="" class="mx-auto" />
      </div>
      <div class="space-y-4 mt-6 md:mt-0 md:w-[50%]">
        <h1 class="text-header font-semibold text-3xl">About Amnid</h1>
        <div class="text-bodytext3 space-y-3">
          <p>
            Amnid is a secure and reliable platform that aids in Customer and
            Business verification to promote safe online transactions and lessen
            fraudulent acts.
          </p>
          <p>
            We are dedicated to ensuring a safe and secure online shopping
            environment for business safety and customer trust.
          </p>
          <ul class="pl-5 space-y-2 text-start">
            <li class="list-disc font-medium">For Buyers</li>
            <li class="pl-2">- Vendor Credibility</li>
            <li class="pl-2">- Reliable Reviews</li>
            <li class="pl-2">- Secure Transactions</li>
            <li class="pl-2">- Protection from Scams</li>
            <br />
            <li class="list-disc font-medium">For Businesses</li>
            <li class="pl-2">- Enhanced Credibility</li>
            <li class="pl-2">- Increased Customer Loyalty</li>
            <li class="pl-2">- Reputation Management</li>
            <li class="pl-2">- Competitive Advantage</li>
          </ul>
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
    </div>
  </div>
</template>
