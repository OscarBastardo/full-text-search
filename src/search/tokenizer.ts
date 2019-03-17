import stopwords from "helpers/stopwords";
// tslint:disable-next-line: no-var-requires
const stemmer = require("stemmer");

export const removeStopwords = (tokens: string[]): string[] => {
  const stopStems = stopwords.map(stemmer);
  const out = [];
  for (let i = 0, len = tokens.length; i < len; i++) {
    if (stopStems.indexOf(tokens[i]) === -1) {
      out.push(tokens[i]);
    }
  }
  return out;
};

const tokenizer = (text: string): string[] => {
  const tokens = text
    .toLowerCase()
    .replace(/\W/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((a) => stemmer(a));
  return removeStopwords(tokens);
};

export default tokenizer;
