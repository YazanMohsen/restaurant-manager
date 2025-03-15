import {RestaurantModel} from "./restaurant.model";
import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class RestaurantService{
  private restaurants: RestaurantModel[] = [
    new RestaurantModel(1,
      'Sea Grill North Miami Beach',
      'https://th.bing.com/th/id/R.e049c1b316ee6891f9d57f96879ddb8e?rik=w25JMIE7Ck9PMw&pid=ImgRaw&r=0',
      '3913 NE 163rd St North Miami Beach, FL 33160',
      '11:30 AM - 11:00 PM',
      'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...'
    ),
    new RestaurantModel(2,
      'Sea Grill of Merrick Park',
      'https://th.bing.com/th/id/OIP.T0fRc7U-7usQ_jDHQO9M9QHaEK?rs=1&pid=ImgDetMain',
      '4250 Salzedo Street, Suite 1425Coral Gables, FL 33146',
      '11:30 AM - 11:00 PM',
    ),
    new RestaurantModel(3,
      'Villagio Restaurant & Bar',
      'https://th.bing.com/th/id/R.1d205c0c5323f20131250e96985ef82b?rik=Gww5r5ogGOaRGQ&pid=ImgRaw&r=0',
      '360 San Lorenzo Avenue, Suite 1430Coral Gables, FL 33146-1865',
      '11:30 AM - 11:00 PM',),
    new RestaurantModel(4,
      'Carpaccio American Dream',
      'https://media.cnn.com/api/v1/images/stellar/prod/210315190143-09-foods-to-help-you-sleep-salmon-stock.jpg?q=w_3000,h_2000,x_0,y_0,c_fill/h_447',
      '1 American Dream Way. #F225East Rutherford, NJ 07073',
      '11:30 AM - 11:00 PM',),
    new RestaurantModel(5,
      'Villagio Restaurant & Bar',
      'https://images6.alphacoders.com/439/439410.jpg',
      '1760 Sawgrass Mills CircleSunrise, FL 33323-3912',
      '11:30 AM - 11:00 PM'),
    new RestaurantModel(6,
      'Villagio Restaurant & Bar',
      'https://img.freepik.com/premium-photo/delicious-food-dish-nice-looking-culinary-concept_868749-2704.jpg',
      '344 Plaza Real, Suite 1433 Boca Raton, FL 33432-3937',
      '11:30 AM - 11:00 PM'
    ),
  ];


  getRestaurants(){
    return this.restaurants;
  }

  getRestaurant(id:number){
    return this.restaurants[id];
  }


}
