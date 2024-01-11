<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24" :span="4">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions title="判题条件" :column="{ xs: 1, md: 3 }">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag v-for="(tag, index) of question.tags" :key="index">
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled>
            <a-card v-if="question">
              <MdViewer :value="question.content || ''" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解" disabled>
            <!--展示题解-->
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="4">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              allow-search
              :style="{ width: '320px' }"
              placeholder="Please select language"
            >
              <a-option v-for="(item, index) in language" :key="index"
                >{{ item.name }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <code-editor
          :value="form.code as string"
          :language="form.language as string"
          :handle-value-change="handleChange"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-col>
      <a-col :span="4">
        {{ question }}
      </a-col>
      <a-col :span="4">
        {{ question }}
      </a-col>
      <a-col :span="4">
        {{ question }}
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVo,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import language from "@/utils/language.json";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const question = ref<QuestionVo>();
const id = Number(props.id);
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoById(id);
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("题目加载失败" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

const handleChange = (value: string) => {
  form.value.code = value;
};
/**
 * 提交代码
 * @returns
 */
const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmit({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>
<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 8px !important;
}
</style>
