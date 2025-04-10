export class UserModel{
  constructor(
    public id:number,
    public email:string,
    public name:string,
    public token:string,
    public role:string,
    public restaurant_id:number,
  ) {
  }
}
