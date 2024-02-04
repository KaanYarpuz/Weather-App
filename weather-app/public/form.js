document.getElementById('weatherForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const city = document.getElementById('cityInput').value;
    
    try {
      const response = await fetch('/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });
  
      const data = await response.json();
  
      const weatherResultElement = document.getElementById('weatherResult');
  
      const { name, sys, main, weather, cod } = data;
  
      if (cod && cod !== '404') {
        const country = sys?.country || 'Unknown';
        const temperature = main?.temp ? main.temp + ' &#8451;' : 'Not available';
        const description = weather?.[0]?.description || 'Not available';
  
        weatherResultElement.innerHTML = `
          <h3 class="text-xl font-semibold">${name}, ${country}</h3>
          <p class="mt-2">Temperatuur: ${temperature}</p>
          <p>Weer: ${description}</p>
        `;
      } else {
        weatherResultElement.innerHTML = `<p class="text-red-500">City not found</p>`;
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  });
  