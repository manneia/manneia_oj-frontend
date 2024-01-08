<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

interface Props {
  value: string;
  handleValueChange: (value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleValueChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  toRaw(codeEditor.value).setValue("新的值");
};

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    colorDecorators: true,
    readOnly: false,
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleValueChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
