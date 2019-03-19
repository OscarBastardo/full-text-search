import Document from "typings/Document";
import BM25 from "./bm25";
import tokenizer from "./tokenizer";

describe("BM25", () => {
  const k1 = 1.3;
  const b = 0.75;
  const documents: Document[] = [
    {
      id: 0,
      body: "Tf-idf stands for term frequency-inverse document frequency.",
    }, {
      id: 1,
      body: "This weight is a statistical measure used to evaluate how important a word is",
    }, {
      id: 2,
      body: "The tf-idf weight is a weight often used in information retrieval and text mining",
    }, {
      id: 3,
      body: "Variations of the tf-idf weighting scheme are often used by search engines",
    }, {
      id: 4,
      body: "the number of times a word appears in a document divided by the total",
    },
  ];

  it("should add a new document and increase the counter", () => {
    const bm25 = new BM25(tokenizer, k1, b);
    const totalDocuments = bm25.totalDocuments;
    bm25.addDocument(documents[0]);
    expect(bm25.totalDocuments).toEqual(totalDocuments + 1);
  });

  it("should update IDF of term after many documents are added", () => {
    const bm25 = new BM25(tokenizer, k1, b);
    bm25.addDocument(documents[1]);
    bm25.updateIdf();
    const statisticalIdf1 = bm25.terms[tokenizer("statistical")[0]].idf;
    bm25.addDocument(documents[2]);
    bm25.addDocument(documents[3]);
    bm25.updateIdf();
    const statisticalIdf2 = bm25.terms[tokenizer("statistical")[0]].idf;
    expect(statisticalIdf1).toBeLessThan(statisticalIdf2);
  });

  it("should retrieve ordered search results", () => {
    const bm25 = new BM25(tokenizer, k1, b);
    documents.forEach((document) => bm25.addDocument(document));
    bm25.updateIdf();
    const searchResult = bm25.search("document frequency");
    expect(searchResult.length).toEqual(2);
    searchResult.forEach((result, i) => {
      if (i < (searchResult.length - 1) && searchResult.length > 1) {
        expect(result.score).toBeGreaterThan(searchResult[i + 1].score);
      }
    });
  });
});
