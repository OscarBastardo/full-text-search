class BM25 {
  private tokenizer: (text: string) => string[];

  constructor(tokenizer: (text: string) => string[]) {
    this.tokenizer = tokenizer;
  }

}
