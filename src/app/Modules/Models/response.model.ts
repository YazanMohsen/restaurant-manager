export class ResponseModel<T> {
  constructor(
    public status: string,
    public message: string,
    public model: T,
    public list: T[]
  ) {

  }

}
