<template>
  <Viewer :value="value" aria-readonly="true" :plugins="plugins" />
</template>

<script setup lang="ts">
import Viewer from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { withDefaults, defineProps } from "vue";

/**
 * 定义属性组件的类型
 * @param value 编辑器内容
 * @param handleChange 编辑器内容改变时触发的事件
 */
interface Props {
  value: string;
}

/**
 * 给定默认值
 * @param props 传入的属性
 * @param defaultProps 默认属性
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
const plugins = [gfm(), highlight()];
</script>

<style></style>
