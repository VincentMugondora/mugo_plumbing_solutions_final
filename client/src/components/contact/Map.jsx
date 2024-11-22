import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -17.8656, lng: 30.9966 }, // Coordinates for Mufakose, Harare
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: { lat: -17.8656, lng: 30.9966 },
      map,
      title: 'Mufakose, Harare',
    });
  }, []);

  return (
    <div id="map" style={{ height: '400px', width: '100%' }}>
      {/* Map will be rendered here */}
    </div>
  );
};

export default Map;
