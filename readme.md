# SkyCast Weather Application

SkyCast is a user-friendly weather application that provides current and upcoming weather information for any city in the world. Users can easily check the daily high and low temperatures, get additional weather details, and receive clothing recommendations based on weather conditions.

![SkyCast Logo](./assets/skycast-logo-simple.svg)

## Features
- **Search for Weather by City**: Input a city name to get the latest weather information.
- **Daily High and Low Temperatures**: Displays both high and low temperatures for the day.
- **Weather Details**: View current weather descriptions, humidity, and wind speed.
- **Wind Speed Units**: Wind speed is displayed in either meters per second or miles per hour based on the selected temperature unit (metric/imperial).
- **Clothing Recommendations**: Suggests clothing based on weather conditions.
- **Responsive Design**: Built with Bootstrap to work seamlessly on different devices and screen sizes.

## Technologies Used
- HTML5
- CSS3 (including Bootstrap for responsiveness and animations)
- JavaScript (with jQuery for simplified DOM manipulation)
- OpenWeatherMap API

## Project Structure
## Project Structure

SKYCAST/
├── index.html                      # Main HTML file
├── css/
│   └── style.css                   # Custom CSS styles
├── js/
│   └── app.js                      # JavaScript for weather functionality
├── assets/
│   └── skycast-logo-simple.svg     # Logo for the application
├── .gitignore                      # File to exclude sensitive/unnecessary files
└── README.md                       # Project documentation


## Installation and Setup
To run this project locally, follow these steps:

1. **Clone the repository**:
2. **Navigate to the project directory**:
3. **Open `index.html` in your browser** to use the application.

## Prerequisites
- **Internet Connection**: This application fetches live data from the OpenWeatherMap API, so you need an active internet connection.
- **API Key**: The application currently has an API key embedded within the JavaScript code, but you should move it to a secure configuration file or environment variable for production.

## Usage
1. **Search for a City**: Enter the name of any city in the text box and click "Get Weather" to view the weather details.
2. **Select Temperature Unit**: Use the dropdown to select between Celsius or Fahrenheit.
3. **View Weather Details**: Check daily highs and lows, weather description, humidity, and wind speed.
4. **Clothing Recommendations**: Based on the weather, the app will suggest what kind of clothing to wear.

## Improvements and Future Enhancements

### Security Improvements
- **API Key Security**: Currently, the API key is embedded in the JavaScript file (`app.js`). For production purposes, I plan to move the key to a secure location such as environment variables or a backend server, ensuring better security.
- **Input Validation**: Additional input validation is planned to ensure that user input is sanitized, providing an extra layer of security.

### User Experience Enhancements
- **Loading Indicator**: To improve the user experience, I intend to add a loading indicator to show while the weather data is being fetched. This will provide better visual feedback to users.
- **Better Error Handling**: Currently, basic error handling is implemented. I will expand this to provide more specific error messages, such as "No internet connection" or "API limit reached," to give users more useful feedback.

### Future Features
- **City-State Specific Search**: I am considering enhancing the search feature to better distinguish between cities with the same name, such as cities in different states or countries (e.g., "Louisville, KY" vs. "Louisville, CO"). This would make the app even more user-friendly for these cases.
- **Favorite Cities**: I want to add a "Favorites" feature so that users can save their favorite cities and quickly access their weather updates. This will make the app more convenient for regular users who want to check multiple cities.

## Contributing
Contributions are always welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
If you have any questions or suggestions, feel free to reach out:
- **Email**: loueastendhomes@gmail.com
- **GitHub**: [your-username](https://github.com/your-username)

## Screenshots
You can add screenshots of the application in use to make it more appealing to viewers. For example:
- **Home Page**: A view of the search bar, logo, and input field.
- **Weather Display**: A view of the weather details after a user searches for a city.
