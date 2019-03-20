export interface Document {
  id: number;
  body: string;
  score?: number;
}

class BM25 {
  public totalDocumentTermLength: number = 0;
  public averageDocumentLength: number = 0;
  public totalDocuments: number = 0;
  public documents: any = {};
  public terms: any = {};
  private tokenizer: (text: string) => string[];
  private k1: number;
  private b: number;

  constructor(tokenizer: (text: string) => string[], k1: number, b: number) {
    this.tokenizer = tokenizer;
    this.k1 = k1;
    this.b = b;
  }

  public addDocument(doc: Document): void {
    if (typeof doc.id === "undefined") { throw new Error("ID is a required property of documents."); }
    if (typeof doc.body === "undefined") { throw new Error("Body is a required property of documents."); }

    const { id, body } = doc;
    const tokens = this.tokenizer(doc.body);

    const docObj = {
      id,
      body,
      tokens,
      termCount: tokens.length,
      terms: null,
    };

    this.totalDocuments++;
    this.totalDocumentTermLength += docObj.termCount;
    this.averageDocumentLength = this.totalDocumentTermLength / this.totalDocuments;

    const terms = {};
    for (const term of tokens) {
      if (typeof terms[term] === "undefined") {
          terms[term] = {
              count: 0,
              freq: 0,
          };
      }
      terms[term].count++;
    }

    for (const term in terms) {
      if (terms.hasOwnProperty(term)) {
        terms[term].freq = terms[term].count / docObj.termCount;

        if (typeof this.terms[term] === "undefined") {
            this.terms[term] = {
                idf: 0,
                n: 0,
            };
        }

        this.terms[term].n++;
      }
    }

    docObj.terms = terms;
    this.documents[docObj.id] = docObj;
  }

  public updateIdf(): void {
    for (const term in this.terms) {
      if (this.terms.hasOwnProperty(term)) {
        const numerator = (this.totalDocuments - this.terms[term].n + 0.5);
        const denominator = (this.terms[term].n + 0.5);
        this.terms[term].idf = Math.max(Math.log10(numerator / denominator), 0.01);
      }
    }
  }

  public search(query: string): Document[] {
    const queryTerms = this.tokenizer(query);
    const results = [];

    for (const id in this.documents) {
      if (this.documents.hasOwnProperty(id)) {
        this.documents[id].score = 0;

        for (const queryTerm of queryTerms) {
            if (typeof this.terms[queryTerm] === "undefined") {
                continue;
            }

            if (typeof this.documents[id].terms[queryTerm] === "undefined") {
                continue;
            }

            const tf = this.documents[id].terms[queryTerm].count;
            const idf = this.terms[queryTerm].idf;
            const numerator = tf * (this.k1 + 1);
            const denominator = tf + this.k1
              * (1 - this.b + (this.b * this.documents[id].termCount / this.averageDocumentLength));

            this.documents[id].score += idf * numerator / denominator;
        }

        if (!isNaN(this.documents[id].score) && this.documents[id].score > 0) {
            results.push(this.documents[id]);
        }
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10);
  }
}

export default BM25;
