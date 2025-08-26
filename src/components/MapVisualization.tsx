import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Users, Building2, TrendingUp, Settings } from 'lucide-react';

const MapVisualization = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Dữ liệu mẫu các huyện/thành phố của Hưng Yên
  const districtData = [
    { name: "TP Hưng Yên", workers: 2850, companies: 156, coords: [106.0511, 20.6464], unemployment: 3.2 },
    { name: "Văn Lâm", workers: 1920, companies: 98, coords: [106.0200, 20.9800], unemployment: 2.8 },
    { name: "Văn Giang", workers: 2140, companies: 124, coords: [105.9100, 20.9400], unemployment: 3.1 },
    { name: "Yên Mỹ", workers: 1650, companies: 89, coords: [106.0300, 20.9100], unemployment: 2.5 },
    { name: "Mỹ Hao", workers: 1890, companies: 102, coords: [105.9600, 20.9300], unemployment: 3.0 },
    { name: "Ân Thi", workers: 1430, companies: 76, coords: [106.0800, 20.8100], unemployment: 2.9 },
    { name: "Khoái Châu", workers: 1580, companies: 82, coords: [105.9000, 20.8400], unemployment: 3.3 },
    { name: "Kim Động", workers: 1240, companies: 68, coords: [106.0100, 20.7200], unemployment: 3.5 },
    { name: "Tiên Lữ", workers: 980, companies: 54, coords: [106.1400, 20.7800], unemployment: 4.1 },
    { name: "Phù Cừ", workers: 1167, companies: 62, coords: [106.1000, 20.6800], unemployment: 3.8 }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [106.0511, 20.7464], // Tọa độ trung tâm Hưng Yên
      zoom: 9.5,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add markers for each district
      districtData.forEach((district) => {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.style.cssText = `
          width: ${Math.max(20, district.workers / 100)}px;
          height: ${Math.max(20, district.workers / 100)}px;
          background: linear-gradient(135deg, hsl(210 100% 45%), hsl(142 76% 36%));
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        markerEl.innerHTML = `${Math.round(district.workers / 100)}`;

        // Create popup content
        const popupContent = `
          <div style="padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: hsl(210 100% 45%); font-weight: bold;">${district.name}</h3>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: hsl(142 76% 36%);">👥</span>
                <span>${district.workers.toLocaleString()} người lao động</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: hsl(43 96% 56%);">🏢</span>
                <span>${district.companies} doanh nghiệp</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: ${district.unemployment > 3.5 ? '#ef4444' : '#22c55e'};">📊</span>
                <span>Thất nghiệp: ${district.unemployment}%</span>
              </div>
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(popupContent);

        new mapboxgl.Marker(markerEl)
          .setLngLat(district.coords as [number, number])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
      alert('Lỗi tải bản đồ. Vui lòng kiểm tra lại Mapbox token.');
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken.trim());
    }
  };

  // Calculate totals
  const totalWorkers = districtData.reduce((sum, d) => sum + d.workers, 0);
  const totalCompanies = districtData.reduce((sum, d) => sum + d.companies, 0);
  const avgUnemployment = districtData.reduce((sum, d) => sum + d.unemployment, 0) / districtData.length;
  const highestWorkers = Math.max(...districtData.map(d => d.workers));

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng lao động</p>
                <p className="text-2xl font-bold text-primary">{totalWorkers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
                <p className="text-2xl font-bold text-secondary">{totalCompanies}</p>
              </div>
              <Building2 className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">TB thất nghiệp</p>
                <p className="text-2xl font-bold text-accent">{avgUnemployment.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Huyện dẫn đầu</p>
                <p className="text-2xl font-bold text-gov-green">{highestWorkers.toLocaleString()}</p>
              </div>
              <MapPin className="w-8 h-8 text-gov-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Bản đồ phân bố nguồn nhân lực Hưng Yên</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showTokenInput ? (
            <div className="space-y-4 p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cấu hình Mapbox Token
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Để hiển thị bản đồ, vui lòng nhập Mapbox Public Token của bạn.
                  <br />
                  Bạn có thể lấy token tại{' '}
                  <a 
                    href="https://mapbox.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <div>
                  <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                  <Input
                    id="mapbox-token"
                    type="text"
                    placeholder="pk.ey..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleTokenSubmit}
                  disabled={!mapboxToken.trim()}
                  className="w-full"
                >
                  Tải bản đồ
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-lg" />
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Đang tải bản đồ...</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground mb-2">Chú thích:</div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                  <span>Kích thước = Số lượng lao động</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* District Data Table */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle>Chi tiết theo huyện/thành phố</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Huyện/TP</th>
                  <th className="text-right py-2">Lao động</th>
                  <th className="text-right py-2">Doanh nghiệp</th>
                  <th className="text-right py-2">Thất nghiệp</th>
                </tr>
              </thead>
              <tbody>
                {districtData
                  .sort((a, b) => b.workers - a.workers)
                  .map((district, index) => (
                    <tr key={district.name} className="border-b hover:bg-muted/50">
                      <td className="py-2 font-medium">{district.name}</td>
                      <td className="text-right py-2">{district.workers.toLocaleString()}</td>
                      <td className="text-right py-2">{district.companies}</td>
                      <td className="text-right py-2">
                        <span className={district.unemployment > 3.5 ? 'text-destructive' : 'text-gov-green'}>
                          {district.unemployment}%
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapVisualization;