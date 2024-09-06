import { Context, Next } from "koa";
import labelService from "../service/label.service";
import types from "../constants/index";
interface Label {
  name: string;
  id: string | number;
}
export async function verifyLabelExists(ctx: Context, next: Next) {
  const labels = (ctx.request.body as any).labels;
  let newLabels = [];
  for (let i = 0; i < labels.length; i++) {
    let label: Label = { name: labels[i], id: "" };
    let result = await labelService.getLabelNameByName(labels[i]);
    if ("length" in result && result[0]) {
      label.id = (result[0] as any).id;
    } else {
      // 标签不存在，插入到标签表中
      try {
        const getLabelIdResult = (await labelService.create(labels[i])) as any;
        label.id = getLabelIdResult.insertId
      } catch (err) {
        let error = new Error(types.CREATE_LABEL_ERROR);
        ctx.app.emit("error", error, ctx);
        return;
      }
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
}
