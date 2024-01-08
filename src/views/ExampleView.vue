<template>
  <div class="exampleView">
    <MdEditor :value="mdValue" :handle-change="handleMdChange" />
    <code-editor :value="codeValue" :handle-value-change="handleCodeChange" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditor.vue";

const codeValue = ref("");
const mdValue = ref("");
const handleCodeChange = (v: string) => {
  console.log(v);
  codeValue.value = v;
};
const handleMdChange = (v: string) => {
  mdValue.value = v;
};
</script>
