export class FilterOrderForm {
  public textSearch ?: String;
  public status ?: String;
  public pageReq ?: PageReq;

  constructor(textSearch : String, status : String, pageReq : PageReq) {
    this.textSearch = textSearch;
    this.status = status;
    this.pageReq = pageReq;
  }
}

export class PageReq {
  public page ?: String;
  public pageSize ?: String;

  constructor(page : String, pageSize : String) {
    this.page = page;
    this.pageSize = pageSize;
  }
}
