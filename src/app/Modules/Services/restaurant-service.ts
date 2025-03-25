import {RestaurantModel} from "../Models/restaurant.model";
import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {HttpService} from "./http.service";
import {ResponseModel} from "../Models/response.model";

@Injectable({providedIn: "root"})
export class RestaurantService {
  // private restaurants: RestaurantModel[] = [];
  //   = [
  //   new RestaurantModel(0,
  //     'Sea Grill North Miami Beach',
  //     'https://th.bing.com/th/id/R.e049c1b316ee6891f9d57f96879ddb8e?rik=w25JMIE7Ck9PMw&pid=ImgRaw&r=0',
  //     '3913 NE 163rd St North Miami Beach, FL 33160',
  //     '11:30 AM - 11:00 PM',
  //     'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...',
  //     [
  //       new MealModel(0, "Fish ", "https://bing.com/th?id=OSK.b5583dbe95c0f79b4bfd67483d07c297", 100, "Delicious Food"),
  //       new MealModel(1, "Sea Burger", "https://th.bing.com/th/id/R.98c09ef09fc61a42ef668ee8e279a85e?rik=tvAyuzeLhfpeNQ&riu=http%3a%2f%2fwww.tassal.com.au%2fwp-content%2fuploads%2f2019%2f05%2fBurger-L.jpg&ehk=NaOEnR270UUc3wO4vs161IKOwn0osWWztySZOh4sOAY%3d&risl=&pid=ImgRaw&r=0", 200, 'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...'
  //       ),
  //       new MealModel(1, "Sea Burger", "https://th.bing.com/th/id/R.98c09ef09fc61a42ef668ee8e279a85e?rik=tvAyuzeLhfpeNQ&riu=http%3a%2f%2fwww.tassal.com.au%2fwp-content%2fuploads%2f2019%2f05%2fBurger-L.jpg&ehk=NaOEnR270UUc3wO4vs161IKOwn0osWWztySZOh4sOAY%3d&risl=&pid=ImgRaw&r=0", 200, 'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...'
  //       ),
  //       new MealModel(1, "Sea Burger", "https://th.bing.com/th/id/R.98c09ef09fc61a42ef668ee8e279a85e?rik=tvAyuzeLhfpeNQ&riu=http%3a%2f%2fwww.tassal.com.au%2fwp-content%2fuploads%2f2019%2f05%2fBurger-L.jpg&ehk=NaOEnR270UUc3wO4vs161IKOwn0osWWztySZOh4sOAY%3d&risl=&pid=ImgRaw&r=0", 200, 'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...'
  //       )
  //     ]
  //   ),
  //   new RestaurantModel(1,
  //     'Sea Grill of Merrick Park',
  //     'https://th.bing.com/th/id/OIP.T0fRc7U-7usQ_jDHQO9M9QHaEK?rs=1&pid=ImgDetMain',
  //     '4250 Salzedo Street, Suite 1425Coral Gables, FL 33146',
  //     '11:30 AM - 11:00 PM',
  //   ),
  //   new RestaurantModel(2,
  //     'Villagio Restaurant & Bar',
  //     'https://th.bing.com/th/id/R.1d205c0c5323f20131250e96985ef82b?rik=Gww5r5ogGOaRGQ&pid=ImgRaw&r=0',
  //     '360 San Lorenzo Avenue, Suite 1430Coral Gables, FL 33146-1865',
  //     '11:30 AM - 11:00 PM',),
  //   new RestaurantModel(3,
  //     'Carpaccio American Dream',
  //     'https://media.cnn.com/api/v1/images/stellar/prod/210315190143-09-foods-to-help-you-sleep-salmon-stock.jpg?q=w_3000,h_2000,x_0,y_0,c_fill/h_447',
  //     '1 American Dream Way. #F225East Rutherford, NJ 07073',
  //     '11:30 AM - 11:00 PM',),
  //   new RestaurantModel(4,
  //     'Villagio Restaurant & Bar',
  //     'https://images6.alphacoders.com/439/439410.jpg',
  //     '1760 Sawgrass Mills CircleSunrise, FL 33323-3912',
  //     '11:30 AM - 11:00 PM'),
  //   new RestaurantModel(5,
  //     'Villagio Restaurant & Bar',
  //     'https://img.freepik.com/premium-photo/delicious-food-dish-nice-looking-culinary-concept_868749-2704.jpg',
  //     '344 Plaza Real, Suite 1433 Boca Raton, FL 33432-3937',
  //     '11:30 AM - 11:00 PM'
  //   ),
  // ];

  constructor(private httpService: HttpService) {
  }

  getRestaurants() {
    // return this.restaurants;
    return this.httpService.get('restaurants');

  }

  getRestaurant(id: number) {
    return this.httpService.get('restaurants/' + id);
  }

  getMeals() {
    return this.httpService.get('items');
  }

  getRestaurantMeals(restaurantId: number) {
    return this.httpService.get('items/restaurant/'+restaurantId);
  }

  // getRestaurantFood(number: number) {
  //   return [
  //     new MealModel(0, "Fish ", "https://img.freepik.com/premium-photo/delicious-food-dish-nice-looking-culinary-concept_868749-2704.jpg", 100, "Delicious Food"),
  //     new MealModel(1, "See Burger", "https://th.bing.com/th/id/R.98c09ef09fc61a42ef668ee8e279a85e?rik=tvAyuzeLhfpeNQ&riu=http%3a%2f%2fwww.tassal.com.au%2fwp-content%2fuploads%2f2019%2f05%2fBurger-L.jpg&ehk=NaOEnR270UUc3wO4vs161IKOwn0osWWztySZOh4sOAY%3d&risl=&pid=ImgRaw&r=0", 200, 'Villagio restaurant and bar has one mission: to provide guests with a fine and fresh seafood experience. Featuring seasonal and sustainable seafood that is flown in fresh daily, our chef-driven menu proves that no matter when you’re dining, seafood can be truly exceptional. to provide guests with a fine and fresh seafood experience. Featuring seasonal and to provide guests with a fine and fresh Read More...'
  //     )
  //   ];
  // }
}
