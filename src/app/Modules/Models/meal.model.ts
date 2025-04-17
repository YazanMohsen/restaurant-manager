export class MealModel {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public price: number,
    public avg_rate?: number,
    public description?: string,
    public count?: number,
    public total_price?: number,
    public item_id?: number,
    public restaurant_id?: number,
    public user_rating?: number,
  ) {
  }
}
