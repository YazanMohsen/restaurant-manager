export class MealModel {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public price: number,
    public description?: string,
    public count?: number,
    public total_price?: number,
    public item_id?: number,
  ) {
  }
}
