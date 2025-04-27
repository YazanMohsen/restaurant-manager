import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../Services/restaurant-service";
import {AuthService} from "../../Services/auth.service";
import {ResponseModel} from "../../Models/response.model";
import {MealModel} from "../../Models/meal.model";
import {RestaurantModel} from "../../Models/restaurant.model";
import {ChartModel} from "../../Models/chart.model";
import {ReservationService} from "../../Services/reservation.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
    private authService: AuthService,
  ) {
  }

  topRatedChart: ChartModel = new ChartModel();
  secondChart: ChartModel = new ChartModel();
  isLoading = true;

  ngOnInit(): void {
    this.fetchChartDate();
  }

  private fetchChartDate() {
    if (this.authService.isRestaurantAdmin()) {
      this.restaurantService.getRestaurantMeals(this.authService.getUser().restaurant_id).subscribe(
        (response: ResponseModel<MealModel>) => {
          if (response != null && response.list != null)
            response.list.forEach(meal => {
              this.topRatedChart.data.push({
                name: meal.name,
                value: meal.avg_rate
              })
            })

          this.topRatedChart.title = 'Top Rated Meals'
          this.topRatedChart.XTitle = 'Meal'
          this.topRatedChart.YTitle = 'Avg Rate'
          this.topRatedChart.sideTitle = '🍽 Meal Rate Insights 🍽'
          this.topRatedChart.sideContent = 'Optimize your restaurant’s efficiency by analyzing meal trends. Identify peak hours, popular dishes, and customer preferences to enhance service and reduce waste.\n' +
            '        \nTurn data into strategic success! 📊✨'

          this.restaurantService.getItemsOrders(this.authService.getUser().restaurant_id).subscribe(
            (response: ResponseModel<{ name: string, value: number }>) => {
              if (response != null && response.list != null)
              response.list.forEach(meal => {
                this.secondChart.data.push({
                  name: meal.name,
                  value: meal.value
                })
              })
              this.secondChart.title = 'Top Ordered Meals'
              this.secondChart.XTitle = 'Meal'
              this.secondChart.YTitle = 'Avg Order'
              this.secondChart.sideTitle = '🍽 Most Ordered Meals Insights 🚀'
              this.secondChart.sideContent = 'Discover the crowd favorites! This chart showcases the top meals customers can’t get enough of. Use these insights to refine your menu, highlight bestsellers, and create irresistible promotions. Turning popular choices into unforgettable dining experiences! 📊✨'


              this.isLoading = false;
            }
          )

        }
      )

    }
    if (this.authService.isSystemAdmin())
      this.restaurantService.getRestaurants().subscribe(
        (response: ResponseModel<RestaurantModel>) => {
          response.list.forEach(restaurant => {
            this.topRatedChart.data.push({
              name: restaurant.name,
              value: restaurant.avg_rate
            })
            this.topRatedChart.title = 'Top Rated Restaurants'
            this.topRatedChart.XTitle = 'Restaurant'
            this.topRatedChart.YTitle = 'Avg Rate'
            this.topRatedChart.sideTitle = '🍽 Restaurant Rate Insights 🍽'
            this.topRatedChart.sideContent = 'Optimize your restaurant’s efficiency by analyzing meal trends. Identify peak hours, popular dishes, and customer preferences to enhance service and reduce waste.\n' +
              '        \nTurn data into strategic success! 📊✨'


          })
          this.reservationService.restaurantsVisits().subscribe(
            (response: ResponseModel<{ name: string, value: number }>) => {
              response.list.forEach(restaurant => {
                this.secondChart.data.push({
                  name: restaurant.name,
                  value: restaurant.value
                })
                this.secondChart.title = 'Most Visited Restaurants'
                this.secondChart.XTitle = 'Restaurant'
                this.secondChart.YTitle = 'Visits'
                this.secondChart.sideTitle = '🏢 Top Restaurant Destinations ✨'
                this.secondChart.sideContent = 'Discover the most popular dining hotspots! This chart highlights the restaurants customers love visiting the most. Use these insights to recognize success, identify trends, and craft strategies to attract even more patrons. Turning visits into loyal dining experiences! 📊🍴'


              })
              this.isLoading = false;
            }
          )
        }
      )
  }
}
