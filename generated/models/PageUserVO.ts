/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItem } from "./OrderItem";
import type { UserVo } from "./UserVo";

export type PageUserVo = {
  records?: Array<UserVo>;
  total?: number;
  size?: number;
  current?: number;
  /**
   * @deprecated
   */
  orders?: Array<OrderItem>;
  /**
   * @deprecated
   */
  optimizeCountSql?: boolean;
  /**
   * @deprecated
   */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   */
  countId?: string;
  /**
   * @deprecated
   */
  maxLimit?: number;
  pages?: number;
};
