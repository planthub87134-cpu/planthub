import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Cloud, Sun, CloudRain, MapPin, Thermometer } from 'lucide-react';
import { PRODUCTS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export default function WeatherRecommendations() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [recommendedPlants, setRecommendedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    // Try to get location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Fetch weather from Open-Meteo (free, no API key required)
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const data = await response.json();
          
          if (data && data.current_weather) {
            setWeatherData(data.current_weather);
            filterPlantsByWeather(data.current_weather.temperature, data.current_weather.weathercode);
          } else {
            setLocationError("Could not fetch weather data");
          }
        } catch (error) {
          setLocationError("Error fetching weather data");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        // User denied location or timeout
        setLocationError("Location access denied or unavailable");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  const filterPlantsByWeather = (temperature, weathercode) => {
    let matches = [];
    let condition = "";
    
    // WMO Weather interpretation codes (simplified)
    const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weathercode);
    
    if (temperature > 28) {
      // Hot weather -> Succulents, Outdoor, Full Sun
      condition = "Hot & Sunny";
      matches = PRODUCTS.filter(p => p.category === 'Succulent' || p.lightReq === 'Full Sun');
    } else if (temperature < 15) {
      // Cold weather -> Resilient Indoor plants
      condition = "Cold";
      matches = PRODUCTS.filter(p => p.category === 'Indoor' && (p.careLevel === 'Beginner' || p.careLevel === 'Easy'));
    } else if (isRaining) {
      // Rainy/Humid -> Tropical loving indoor plants
      condition = "Rainy/Humid";
      matches = PRODUCTS.filter(p => p.category === 'Indoor' && p.lightReq === 'Bright Indirect');
    } else {
      // Mild weather -> Most indoor plants thrive here
      condition = "Mild & Pleasant";
      matches = PRODUCTS.filter(p => p.category === 'Indoor');
    }
    
    // Fallback if not enough matches
    if (matches.length < 4) {
      matches = [...matches, ...PRODUCTS].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i); // Unique merge
    }
    
    // Shuffle and pick 4
    const shuffled = matches.sort(() => 0.5 - Math.random());
    setRecommendedPlants(shuffled.slice(0, 4));
  };

  const getWeatherIcon = (weathercode) => {
    // Simplified mapping
    if ([0, 1].includes(weathercode)) return <Sun size={24} color="#f59e0b" />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weathercode)) return <CloudRain size={24} color="#3b82f6" />;
    return <Cloud size={24} color="#9ca3af" />;
  };

  // If loading or location failed, don't show the section to avoid cluttering the landing page with errors
  if (loading || locationError || !weatherData) {
    return null; 
  }

  return (
    <section className="section" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: 'var(--space-10) 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '12px 24px', borderRadius: 'var(--radius-full)', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', marginBottom: 'var(--space-4)' }}>
            {getWeatherIcon(weatherData.weathercode)}
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {Math.round(weatherData.temperature)}°C in your area
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-800)', marginBottom: 'var(--space-2)' }}>
            Weather-Perfect Plants
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Based on your current local weather, we think these plants will thrive perfectly in your home right now!
          </p>
        </div>

        <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
          {recommendedPlants.map((product, index) => (
            <div
              key={product.id}
              className={`product-card animate-slide-up delay-${index + 1} hover-lift`}
              style={{ transition: 'all 0.3s ease', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', background: 'var(--bg-primary)' }}
            >
              <div className="product-card-image" style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                <div className="product-card-badge" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge" style={{ background: 'var(--primary-500)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    Perfect for your weather
                  </span>
                </div>
              </div>
              <div className="product-card-body" style={{ padding: 'var(--space-4)' }}>
                <p className="product-card-category" style={{ fontSize: 'var(--text-xs)', color: 'var(--primary-600)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>{product.category}</p>
                <h3 className="product-card-name" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{product.name}</h3>
                <p className="product-card-desc" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                <div className="product-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                  <span className="product-card-price" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)' }}>{formatCurrency(product.price)}</span>
                  <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm hover-scale">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
