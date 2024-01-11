<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

interface Props {
  value: string;
  language: string;
  handleValueChange: (value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: "Java",
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

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
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
