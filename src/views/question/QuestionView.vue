<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input
          v-model="searchParams.title"
          placeholder="please enter question title"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 280px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="please enter question's tag"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptdRate="{ record }"
        >{{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }"
        >创建时间{{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >答题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "通过率",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    dataIndex: "optional",
  },
];
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const router = useRouter();
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPage(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data?.records as never[];
    total.value = res.data?.total as number;
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});

const toQuestionPage = async (question: Question) => {
  // 跳转到题目详情页面
  router.push({
    path: `/view/question/${question.id}`,
  });
};

const onPageChange = (page: number) => {
  console.log(page);
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 监听searchParams变化，自动加载数据
 */
watchEffect(() => {
  loadData();
});

/**
 * 确认搜索, 加载数据
 */
const doSubmit = () => {
  // reset search params
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};
</script>

<style scoped>
#questionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
