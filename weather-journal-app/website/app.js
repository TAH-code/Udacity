const apiKey = 'db09816efa739133cfe84ce6260d0b71'; // Replace <your_api_key> with your actual API key

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateButton = document.getElementById('generate');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

const getWeatherData = async (zipCode) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  return data;
};

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    dateElement.innerHTML = `Date: ${allData.date}`;
    tempElement.innerHTML = `Temperature: ${Math.round(allData.temperature)}°F`;
    contentElement.innerHTML = `Feelings: ${allData.userResponse}`;
  } catch (error) {
    console.log('Error updating UI:', error);
  }
};

generateButton.addEventListener('click', async () => {
  const zipCode = zipInput.value;
  const feelings = feelingsInput.value;

  if (zipCode && feelings) {
    const weatherData = await getWeatherData(zipCode);
    const temperature = weatherData.main.temp;
    const date = new Date().toLocaleDateString();

    await fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature, date, userResponse: feelings })
    });

    updateUI();
  } else {
    alert('Please enter a zip code and your feelings.');
  }
});