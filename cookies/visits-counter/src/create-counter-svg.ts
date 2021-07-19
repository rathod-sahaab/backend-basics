import * as fs from "fs";
import { sprintf } from "sprintf-js";

const SVG_TEMPLATE = fs.readFileSync("./counter-optim.svg").toString();

const createCounterSvg = (count: number): string => {
  return sprintf(SVG_TEMPLATE, count.toString());
};

export default createCounterSvg;
