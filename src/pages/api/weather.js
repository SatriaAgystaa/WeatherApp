export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    
    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(data.cod).json({ message: data.message });
    }
  }
  