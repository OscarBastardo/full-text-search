import BM25 from "./bm25";
import tokenizer from "./tokenizer";

const k1 = 1.3;
const b = 0.75;

export default new BM25(tokenizer, k1, b);
