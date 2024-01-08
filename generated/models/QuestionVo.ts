/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from "./JudgeConfig";
import type { UserVo } from "./UserVo";

export type QuestionVo = {
  id?: number;
  title?: string;
  content?: string;
  tags?: Array<string>;
  submitNum?: number;
  acceptedNum?: number;
  judgeConfig?: JudgeConfig;
  thumbNum?: number;
  favourNum?: number;
  userId?: number;
  createTime?: string;
  updateTime?: string;
  userVo?: UserVo;
};
