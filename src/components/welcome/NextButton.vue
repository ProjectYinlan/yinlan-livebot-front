<template>
  <a :href="href" class="next-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="13"
      height="22"
      viewBox="0 0 13 22"
      fill="none"
    >
      <path
        id="right-arrow"
        fill-rule="evenodd"
        style="fill: #ffffff"
        transform="translate(-2.3092638912203256e-14 -7.993605777301127e-15)  rotate(0 6.575 11.27)"
        opacity="1"
        d="M0.38,0.44C-0.15,1 -0.12,1.89 0.44,2.43L9.73,11.21L0.48,20.13C-0.08,20.67 -0.1,21.56 0.44,22.12C0.72,22.4 1.08,22.55 1.45,22.55C1.8,22.55 2.16,22.41 2.43,22.15L12.68,12.27C12.7,12.25 12.71,12.22 12.73,12.2C12.75,12.19 12.76,12.18 12.78,12.16C12.86,12.08 12.9,11.98 12.95,11.88C12.97,11.85 12.99,11.83 13.01,11.8C13.26,11.26 13.18,10.6 12.72,10.17L2.37,0.38C1.81,-0.15 0.92,-0.12 0.38,0.44Z "
      ></path>
    </svg>
  </a>
</template>

<script setup>
defineProps([
  "href"
])
</script>

<style></style>