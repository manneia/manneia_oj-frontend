/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserVo } from "./UserVo";

export type PostVo = {
  id?: number;
  title?: string;
  content?: string;
  thumbNum?: number;
  favourNum?: number;
  userId?: number;
  createTime?: string;
  updateTime?: string;
  tagList?: Array<string>;
  user?: UserVo;
  hasThumb?: boolean;
  hasFavour?: boolean;
};
