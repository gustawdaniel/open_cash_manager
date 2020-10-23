<template>
    <label
      class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer
      hover:bg-blue-500 hover:text-white">
      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
      </svg>
      <span class="mt-2 text-base leading-normal">Select a file</span>
      <input type='file' class="hidden" @change="upload"/>
    </label>
</template>

<script lang="ts">
// import {parse} from 'qif2json/lib/parse';
import {deserializeQif, serializeQif, QifData} from 'qif-ts';
import Vue from "vue";

function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default Vue.extend({
  name: "UploadFile",
  methods: {
    async upload(e: any) {
      const text = await e.target.files[0].text();
      console.log(text.length);
      console.log(text);

      const qifData: QifData = deserializeQif(text);
      console.log(qifData);

      const out: string = serializeQif(qifData);

      this.$store.commit('init', qifData);
      // download("out.qif",out);


      // const json = parse(text)
      // console.log(json);
    }
  }
});
</script>

<style scoped>

</style>
