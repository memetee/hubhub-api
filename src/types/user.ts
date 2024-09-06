import Koa from "koa";
import { RouterContext } from "koa-router";

export type user = {
  [key: string]: string;
};
export interface Ctx extends RouterContext {
  user?: user;
}
export interface Next extends Koa.Next {}
