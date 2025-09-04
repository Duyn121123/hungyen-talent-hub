import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Users, Building2, TrendingUp, Settings, Factory, Sprout, Briefcase, Laptop, HardHat } from 'lucide-react';

const MapVisualization = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const getIndustryName = (key: string) => {
    const names = {
      manufacturing: 'Sản xuất',
      agriculture: 'Nông nghiệp',
      services: 'Dịch vụ',
      technology: 'Công nghệ',
      construction: 'Xây dựng'
    };
    return names[key as keyof typeof names] || key;
  };

  // Dữ liệu chi tiết các huyện/thành phố của Hưng Yên
  const districtData = [
    { 
      name: "TP Hưng Yên", 
      workers: 2850, 
      companies: 156, 
      coords: [106.0511, 20.6464], 
      unemployment: 3.2,
      industries: {
        manufacturing: { companies: 45, workers: 1200, color: "#ef4444" },
        agriculture: { companies: 38, workers: 850, color: "#22c55e" },
        services: { companies: 42, workers: 520, color: "#3b82f6" },
        technology: { companies: 18, workers: 180, color: "#a855f7" },
        construction: { companies: 13, workers: 100, color: "#f59e0b" }
      },
      salaryRange: { min: 4500000, max: 15000000, avg: 8200000 },
      education: { university: 45, college: 35, vocational: 20 }
    },
    { 
      name: "Văn Lâm", 
      workers: 1920, 
      companies: 98, 
      coords: [106.0200, 20.9800], 
      unemployment: 2.8,
      industries: {
        manufacturing: { companies: 42, workers: 980, color: "#ef4444" },
        agriculture: { companies: 28, workers: 620, color: "#22c55e" },
        services: { companies: 18, workers: 220, color: "#3b82f6" },
        technology: { companies: 6, workers: 60, color: "#a855f7" },
        construction: { companies: 4, workers: 40, color: "#f59e0b" }
      },
      salaryRange: { min: 4200000, max: 12000000, avg: 7400000 },
      education: { university: 25, college: 45, vocational: 30 }
    },
    { 
      name: "Văn Giang", 
      workers: 2140, 
      companies: 124, 
      coords: [105.9100, 20.9400], 
      unemployment: 3.1,
      industries: {
        manufacturing: { companies: 48, workers: 1100, color: "#ef4444" },
        agriculture: { companies: 35, workers: 740, color: "#22c55e" },
        services: { companies: 25, workers: 200, color: "#3b82f6" },
        technology: { companies: 10, workers: 70, color: "#a855f7" },
        construction: { companies: 6, workers: 30, color: "#f59e0b" }
      },
      salaryRange: { min: 4000000, max: 11500000, avg: 7100000 },
      education: { university: 30, college: 40, vocational: 30 }
    },
    { 
      name: "Yên Mỹ", 
      workers: 1650, 
      companies: 89, 
      coords: [106.0300, 20.9100], 
      unemployment: 2.5,
      industries: {
        manufacturing: { companies: 32, workers: 720, color: "#ef4444" },
        agriculture: { companies: 28, workers: 580, color: "#22c55e" },
        services: { companies: 20, workers: 250, color: "#3b82f6" },
        technology: { companies: 5, workers: 60, color: "#a855f7" },
        construction: { companies: 4, workers: 40, color: "#f59e0b" }
      },
      salaryRange: { min: 4100000, max: 10500000, avg: 6800000 },
      education: { university: 20, college: 50, vocational: 30 }
    },
    { 
      name: "Mỹ Hao", 
      workers: 1890, 
      companies: 102, 
      coords: [105.9600, 20.9300], 
      unemployment: 3.0,
      industries: {
        manufacturing: { companies: 38, workers: 850, color: "#ef4444" },
        agriculture: { companies: 32, workers: 680, color: "#22c55e" },
        services: { companies: 22, workers: 260, color: "#3b82f6" },
        technology: { companies: 6, workers: 65, color: "#a855f7" },
        construction: { companies: 4, workers: 35, color: "#f59e0b" }
      },
      salaryRange: { min: 3900000, max: 11000000, avg: 6900000 },
      education: { university: 22, college: 48, vocational: 30 }
    },
    { 
      name: "Ân Thi", 
      workers: 1430, 
      companies: 76, 
      coords: [106.0800, 20.8100], 
      unemployment: 2.9,
      industries: {
        manufacturing: { companies: 28, workers: 620, color: "#ef4444" },
        agriculture: { companies: 25, workers: 520, color: "#22c55e" },
        services: { companies: 15, workers: 190, color: "#3b82f6" },
        technology: { companies: 4, workers: 60, color: "#a855f7" },
        construction: { companies: 4, workers: 40, color: "#f59e0b" }
      },
      salaryRange: { min: 3800000, max: 9500000, avg: 6200000 },
      education: { university: 18, college: 42, vocational: 40 }
    },
    { 
      name: "Khoái Châu", 
      workers: 1580, 
      companies: 82, 
      coords: [105.9000, 20.8400], 
      unemployment: 3.3,
      industries: {
        manufacturing: { companies: 30, workers: 680, color: "#ef4444" },
        agriculture: { companies: 28, workers: 600, color: "#22c55e" },
        services: { companies: 16, workers: 200, color: "#3b82f6" },
        technology: { companies: 4, workers: 50, color: "#a855f7" },
        construction: { companies: 4, workers: 50, color: "#f59e0b" }
      },
      salaryRange: { min: 3700000, max: 9000000, avg: 5800000 },
      education: { university: 15, college: 45, vocational: 40 }
    },
    { 
      name: "Kim Động", 
      workers: 1240, 
      companies: 68, 
      coords: [106.0100, 20.7200], 
      unemployment: 3.5,
      industries: {
        manufacturing: { companies: 24, workers: 520, color: "#ef4444" },
        agriculture: { companies: 22, workers: 480, color: "#22c55e" },
        services: { companies: 14, workers: 160, color: "#3b82f6" },
        technology: { companies: 4, workers: 40, color: "#a855f7" },
        construction: { companies: 4, workers: 40, color: "#f59e0b" }
      },
      salaryRange: { min: 3600000, max: 8500000, avg: 5500000 },
      education: { university: 12, college: 43, vocational: 45 }
    },
    { 
      name: "Tiên Lữ", 
      workers: 980, 
      companies: 54, 
      coords: [106.1400, 20.7800], 
      unemployment: 4.1,
      industries: {
        manufacturing: { companies: 18, workers: 380, color: "#ef4444" },
        agriculture: { companies: 20, workers: 420, color: "#22c55e" },
        services: { companies: 10, workers: 120, color: "#3b82f6" },
        technology: { companies: 3, workers: 30, color: "#a855f7" },
        construction: { companies: 3, workers: 30, color: "#f59e0b" }
      },
      salaryRange: { min: 3500000, max: 8000000, avg: 5200000 },
      education: { university: 10, college: 40, vocational: 50 }
    },
    { 
      name: "Phù Cừ", 
      workers: 1167, 
      companies: 62, 
      coords: [106.1000, 20.6800], 
      unemployment: 3.8,
      industries: {
        manufacturing: { companies: 22, workers: 480, color: "#ef4444" },
        agriculture: { companies: 18, workers: 450, color: "#22c55e" },
        services: { companies: 14, workers: 150, color: "#3b82f6" },
        technology: { companies: 4, workers: 47, color: "#a855f7" },
        construction: { companies: 4, workers: 40, color: "#f59e0b" }
      },
      salaryRange: { min: 3400000, max: 7800000, avg: 5000000 },
      education: { university: 12, college: 38, vocational: 50 }
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [106.0511, 20.7464], // Tọa độ trung tâm Hưng Yên
      zoom: 10,
      pitch: 45,
      bearing: 0,
      antialias: true
    });

    // Add comprehensive map controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    
    map.current.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-right');

    map.current.on('load', () => {
      setIsMapLoaded(true);
      addHeatmapLayer();
      addMarkersToMap();
      
      // Smooth entrance animation
      map.current?.flyTo({
        center: [106.0511, 20.7464],
        zoom: 10,
        pitch: 45,
        duration: 2500,
        essential: true
      });
    });

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
      alert('Lỗi tải bản đồ. Vui lòng kiểm tra token Mapbox của bạn.');
    });
  };

  // Add heatmap layer for workforce distribution visualization
  const addHeatmapLayer = () => {
    if (!map.current) return;

    const heatmapData = {
      type: 'FeatureCollection' as const,
      features: districtData.map(district => ({
        type: 'Feature' as const,
        properties: {
          workers: district.workers,
          companies: district.companies,
          name: district.name,
          unemployment: district.unemployment
        },
        geometry: {
          type: 'Point' as const,
          coordinates: district.coords
        }
      }))
    };

    map.current.addSource('workforce-heatmap', {
      type: 'geojson',
      data: heatmapData
    });

    // Add heatmap layer
    map.current.addLayer({
      id: 'workforce-heatmap-layer',
      type: 'heatmap',
      source: 'workforce-heatmap',
      maxzoom: 15,
      paint: {
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'workers'],
          0, 0,
          3000, 1
        ],
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 0.8,
          15, 2
        ],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgba(103,169,207,0.3)',
          0.4, 'rgba(209,229,240,0.5)',
          0.6, 'rgba(253,219,199,0.7)',
          0.8, 'rgba(239,138,98,0.8)',
          1, 'rgba(178,24,43,1)'
        ],
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 15,
          15, 40
        ],
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 0.8,
          14, 0.4
        ]
      }
    }, 'waterway-label');
  };

  const addMarkersToMap = () => {
    if (!map.current) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.custom-marker');
    existingMarkers.forEach(marker => marker.remove());

    districtData.forEach((district) => {
      // Main district marker
      const markerSize = Math.max(25, district.workers / 80);
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker district-marker';
      markerEl.style.cssText = `
        width: ${markerSize}px;
        height: ${markerSize}px;
        background: linear-gradient(135deg, hsl(210 100% 45%), hsl(142 76% 36%));
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Math.max(8, markerSize / 3)}px;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        position: relative;
        z-index: 1000;
      `;
      markerEl.innerHTML = `${Math.round(district.workers / 100)}`;

      // Enhanced popup content with detailed information
      const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(amount);

      const industryRows = Object.entries(district.industries)
        .map(([key, industry]) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-bottom: 1px solid #f0f0f0;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${industry.color};"></div>
              <span style="font-size: 12px; text-transform: capitalize;">${getIndustryName(key)}</span>
            </div>
            <div style="font-size: 11px; color: #666;">
              <span style="font-weight: bold;">${industry.workers}</span> NLD / 
              <span>${industry.companies}</span> DN
            </div>
          </div>
        `).join('');

      const popupContent = `
        <div style="padding: 16px; min-width: 280px; max-width: 350px; font-family: system-ui;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="width: 4px; height: 20px; background: linear-gradient(135deg, hsl(210 100% 45%), hsl(142 76% 36%)); border-radius: 2px;"></div>
            <h3 style="margin: 0; color: hsl(210 100% 45%); font-weight: bold; font-size: 16px;">${district.name}</h3>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div style="text-align: center; padding: 8px; background: #f8f9ff; border-radius: 6px;">
              <div style="font-size: 18px; font-weight: bold; color: hsl(210 100% 45%);">${district.workers.toLocaleString()}</div>
              <div style="font-size: 11px; color: #666;">Người lao động</div>
            </div>
            <div style="text-align: center; padding: 8px; background: #f0f9f0; border-radius: 6px;">
              <div style="font-size: 18px; font-weight: bold; color: hsl(142 76% 36%);">${district.companies}</div>
              <div style="font-size: 11px; color: #666;">Doanh nghiệp</div>
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-weight: bold; font-size: 12px; margin-bottom: 6px; color: #333;">🏭 Phân bố theo ngành:</div>
            ${industryRows}
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="font-size: 11px;">
              <span style="font-weight: bold;">💰 Lương TB:</span> ${formatCurrency(district.salaryRange.avg)}
            </div>
            <div style="font-size: 11px;">
              <span style="color: ${district.unemployment > 3.5 ? '#ef4444' : '#22c55e'};">📊 Thất nghiệp: ${district.unemployment}%</span>
            </div>
          </div>

          <div style="font-size: 11px; color: #666;">
            <span style="font-weight: bold;">🎓 Trình độ:</span> 
            ĐH: ${district.education.university}% | 
            CĐ: ${district.education.college}% | 
            TC: ${district.education.vocational}%
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup'
      }).setHTML(popupContent);

      new mapboxgl.Marker(markerEl)
        .setLngLat(district.coords as [number, number])
        .setPopup(popup)
        .addTo(map.current!);

      // Add industry markers around the main marker if specific industry is selected
      if (selectedIndustry !== 'all' && district.industries[selectedIndustry as keyof typeof district.industries]) {
        const industry = district.industries[selectedIndustry as keyof typeof district.industries];
        const offset = 0.008; // Small offset for industry marker
        
        const industryMarkerEl = document.createElement('div');
        industryMarkerEl.className = 'custom-marker industry-marker';
        const industrySize = Math.max(12, industry.workers / 50);
        industryMarkerEl.style.cssText = `
          width: ${industrySize}px;
          height: ${industrySize}px;
          background: ${industry.color};
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${Math.max(6, industrySize / 2.5)}px;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          z-index: 999;
        `;
        industryMarkerEl.innerHTML = `${Math.round(industry.workers / 10)}`;

        const industryPopup = new mapboxgl.Popup({
          offset: 15,
          closeButton: false,
          closeOnClick: true
        }).setHTML(`
          <div style="padding: 8px; text-align: center;">
            <div style="font-weight: bold; color: ${industry.color};">${getIndustryName(selectedIndustry)}</div>
            <div style="font-size: 12px;">${industry.workers} NLD | ${industry.companies} DN</div>
          </div>
        `);

        new mapboxgl.Marker(industryMarkerEl)
          .setLngLat([district.coords[0] + offset, district.coords[1] + offset])
          .setPopup(industryPopup)
          .addTo(map.current!);
      }
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken.trim());
    }
  };

  // Re-render markers when industry selection changes
  useEffect(() => {
    if (isMapLoaded && map.current) {
      addMarkersToMap();
    }
  }, [selectedIndustry, isMapLoaded]);

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
                  className="w-full mb-2"
                >
                  Tải bản đồ
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowTokenInput(false)}
                  className="w-full"
                >
                  Xem chế độ thống kê
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Industry Filter */}
              <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground mr-2">Lọc theo ngành:</span>
                <Button
                  variant={selectedIndustry === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('all')}
                  className="h-8 text-xs"
                >
                  <Building2 className="w-3 h-3 mr-1" />
                  Tất cả
                </Button>
                <Button
                  variant={selectedIndustry === 'manufacturing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('manufacturing')}
                  className="h-8 text-xs"
                >
                  <Factory className="w-3 h-3 mr-1" />
                  Sản xuất
                </Button>
                <Button
                  variant={selectedIndustry === 'agriculture' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('agriculture')}
                  className="h-8 text-xs"
                >
                  <Sprout className="w-3 h-3 mr-1" />
                  Nông nghiệp
                </Button>
                <Button
                  variant={selectedIndustry === 'services' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('services')}
                  className="h-8 text-xs"
                >
                  <Briefcase className="w-3 h-3 mr-1" />
                  Dịch vụ
                </Button>
                <Button
                  variant={selectedIndustry === 'technology' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('technology')}
                  className="h-8 text-xs"
                >
                  <Laptop className="w-3 h-3 mr-1" />
                  Công nghệ
                </Button>
                <Button
                  variant={selectedIndustry === 'construction' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry('construction')}
                  className="h-8 text-xs"
                >
                  <HardHat className="w-3 h-3 mr-1" />
                  Xây dựng
                </Button>
              </div>

              {mapboxToken.trim() ? (
                <div className="relative">
                  <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow-lg" />
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
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border border-white"></div>
                        <span>Marker chính = Tổng lao động</span>
                      </div>
                      {selectedIndustry !== 'all' && districtData[0] && (() => {
                        const firstDistrict = districtData[0];
                        const industryKey = selectedIndustry as keyof typeof firstDistrict.industries;
                        const industryData = firstDistrict.industries[industryKey];
                        const markerColor = industryData?.color || '#666';
                        
                        return (
                          <div className="flex items-center space-x-2 text-xs">
                            <div 
                              className="w-3 h-3 rounded-full border border-white" 
                              style={{ backgroundColor: markerColor }}
                            />
                            <span>Marker phụ = {getIndustryName(selectedIndustry)}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-8 h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  
                  <div className="relative h-full">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Sơ đồ phân bố nguồn nhân lực Hưng Yên
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Trực quan hóa dữ liệu trên bản đồ thống kê
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full items-center">
                      {districtData
                        .sort((a, b) => b.workers - a.workers)
                        .map((district, index) => {
                          const maxWorkers = Math.max(...districtData.map(d => d.workers));
                          const sizeRatio = district.workers / maxWorkers;
                          const size = 60 + (sizeRatio * 40); // 60px to 100px
                          
                          const topIndustry = Object.entries(district.industries)
                            .sort(([,a], [,b]) => b.workers - a.workers)[0];
                          
                          const selectedIndustryData = selectedIndustry !== 'all' 
                            ? district.industries[selectedIndustry as keyof typeof district.industries]
                            : null;

                          return (
                            <div key={district.name} className="flex flex-col items-center space-y-2 group">
                              <div className="relative">
                                {/* Main district circle */}
                                <div 
                                  className="rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                                  style={{
                                    width: `${size}px`,
                                    height: `${size}px`
                                  }}
                                  title={`${district.name}: ${district.workers.toLocaleString()} NLD, ${district.companies} DN`}
                                >
                                  <div className="text-center text-white">
                                    <div className="text-xs font-bold">
                                      {Math.round(district.workers / 100)}
                                    </div>
                                    <div className="text-[8px] opacity-90">x100</div>
                                  </div>
                                </div>

                                {/* Industry indicator */}
                                {selectedIndustryData && (
                                  <div 
                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                                    style={{ backgroundColor: selectedIndustryData.color }}
                                    title={`${getIndustryName(selectedIndustry)}: ${selectedIndustryData.workers} NLD`}
                                  >
                                    <span className="text-[8px] text-white font-bold">
                                      {Math.round(selectedIndustryData.workers / 50)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="text-center">
                                <div className="text-xs font-medium text-foreground">
                                  {district.name}
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  {district.workers.toLocaleString()} NLD
                                </div>
                                <div className="flex items-center justify-center space-x-1 mt-1">
                                  <div 
                                    className="w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: topIndustry[1].color }}
                                  ></div>
                                  <span className="text-[8px] text-muted-foreground">
                                    {getIndustryName(topIndustry[0])}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-muted-foreground mb-2">Chú thích:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border border-white"></div>
                          <span>Kích thước = Số lượng lao động</span>
                        </div>
                        {selectedIndustry !== 'all' && (() => {
                          const firstDistrict = districtData[0];
                          const industryKey = selectedIndustry as keyof typeof firstDistrict.industries;  
                          const industryData = firstDistrict.industries[industryKey];
                          const markerColor = industryData?.color || '#666';
                          
                          return (
                            <div className="flex items-center space-x-2 text-xs">
                              <div 
                                className="w-3 h-3 rounded-full border border-white" 
                                style={{ backgroundColor: markerColor }}
                              />
                              <span>Chấm nhỏ = {getIndustryName(selectedIndustry)}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTokenInput(true)}
                        className="bg-card/90 backdrop-blur-sm"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Bản đồ thực
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced District Data Table */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle>Chi tiết theo huyện/thành phố</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Huyện/TP</th>
                  <th className="text-right py-3">Lao động</th>
                  <th className="text-right py-3">Doanh nghiệp</th>
                  <th className="text-right py-3">Lương TB</th>
                  <th className="text-right py-3">Thất nghiệp</th>
                  <th className="text-center py-3">Ngành chủ yếu</th>
                </tr>
              </thead>
              <tbody>
                {districtData
                  .sort((a, b) => b.workers - a.workers)
                  .map((district, index) => {
                    const topIndustry = Object.entries(district.industries)
                      .sort(([,a], [,b]) => b.workers - a.workers)[0];
                    
                    return (
                      <tr key={district.name} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 font-medium">{district.name}</td>
                        <td className="text-right py-3 font-semibold text-primary">
                          {district.workers.toLocaleString()}
                        </td>
                        <td className="text-right py-3 text-secondary">
                          {district.companies}
                        </td>
                        <td className="text-right py-3 text-accent">
                          {new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }).format(district.salaryRange.avg)}
                        </td>
                        <td className="text-right py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            district.unemployment > 3.5 
                              ? 'bg-destructive/10 text-destructive' 
                              : 'bg-gov-green/10 text-gov-green'
                          }`}>
                            {district.unemployment}%
                          </span>
                        </td>
                        <td className="text-center py-3">
                          <div className="flex items-center justify-center space-x-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: topIndustry[1].color }}
                            ></div>
                            <span className="text-xs">{getIndustryName(topIndustry[0])}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapVisualization;