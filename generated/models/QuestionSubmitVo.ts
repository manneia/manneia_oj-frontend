/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from "./JudgeInfo";
import type { QuestionVo } from "./QuestionVo";
import type { UserVo } from "./UserVo";

export type QuestionSubmitVo = {
  id?: number;
  language?: string;
  code?: string;
  judgeInfo?: JudgeInfo;
  status?: number;
  userId?: number;
  createTime?: string;
  updateTime?: string;
  userVo?: UserVo;
  questionVo?: QuestionVo;
};
