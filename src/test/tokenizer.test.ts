import tokenizer, { removeStopwords } from "../search/tokenizer";

describe("Tokenizer", () => {
  it("should remove stopwords from array of tokens", () => {
    const arrayWithStopwords = ["hello", "my", "friend"];
    const expectedArray = ["hello", "friend"];
    const resultArray = removeStopwords(arrayWithStopwords);
    expect(resultArray).toEqual(expectedArray);
  });

  it("should tokenize a text", () => {
    const text = "the quick brown fox jumped over the lazy dogs";
    const expectedArray = ["quick", "brown", "fox", "jump", "lazi", "dog"];
    const resultArray = tokenizer(text);
    expect(resultArray).toEqual(expectedArray);
  });
});
