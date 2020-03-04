import { AfterViewInit, Component, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/Images/map/marker-icon-2x.png';
const iconUrl = 'assets/Images/map/marker-icon.png';
const shadowUrl = 'assets/Images/map/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
L.Marker.prototype.options.draggable = true;
L.Marker.prototype.options.autoPan = true;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  @Output() inputLocationEvent = new EventEmitter<any>();

  private map;
  private states;

  private polygon;

  private marker;
  private marker2;
  private marker3;
  private marker4;

  @Input() geoData: any;

  private long = 10.248656;
  private lat = 36.745143;

  private lat2 = 36.742529;
  private long2 = 10.244966;

  private lat3 = 36.739022;
  private long3 = 10.250287;

  private lat4 = 36.744180;
  private long4 = 10.255952;

  private initMap(): void {
    if (this.geoData && this.geoData[0].latitude && this.geoData[0].longitude) {
        this.map = L.map('map', {
            center: [ this.geoData[0].latitude, this.geoData[0].longitude],
            zoom: 12
          });
    } else {
        this.map = L.map('map', {
            center: [ this.lat, this.long],
            zoom: 12
          });
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  makeCapitalMarkers(map: L.map): void {

    if (this.geoData && this.geoData[0].latitude && this.geoData[0].longitude) {
        this.marker = L.marker([this.geoData[0].latitude, this.geoData[0].longitude]).addTo(map);
        this.marker.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    } else {
        this.marker = L.marker([this.lat, this.long]).addTo(map);
        this.marker.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    }

    if (this.geoData && this.geoData[1].latitude && this.geoData[1].longitude) {
        this.marker2 = L.marker([this.geoData[1].latitude, this.geoData[1].longitude]).addTo(map);
        this.marker2.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    } else {
        this.marker2 = L.marker([this.lat2, this.long2]).addTo(map);
        this.marker2.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    }

    if (this.geoData && this.geoData[2].latitude && this.geoData[2].longitude) {
        this.marker3 = L.marker([this.geoData[2].latitude, this.geoData[2].longitude]).addTo(map);
        this.marker3.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    } else {
        this.marker3 = L.marker([this.lat3, this.long3]).addTo(map);
        this.marker3.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    }

    if (this.geoData && this.geoData[3].latitude && this.geoData[3].longitude) {
        this.marker4 = L.marker([this.geoData[3].latitude, this.geoData[3].longitude]).addTo(map);
        this.marker4.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    } else {
        this.marker4 = L.marker([this.lat4, this.long4]).addTo(map);
        this.marker4.on('dragend', () => {
            this.makePolygon();
            this.sendInputLocation();
        });
    }

  }

  makeMarkersPopUp() {
      this.marker.bindPopup('<div>latitude:' + this.marker.getLatLng().lat +
      '</div><div>longitude:' + this.marker.getLatLng().lng + '</div>');
      this.marker2.bindPopup('<div>latitude:' + this.marker2.getLatLng().lat +
      '</div><div>longitude:' + this.marker2.getLatLng().lng + '</div>');
      this.marker3.bindPopup('<div>latitude:' + this.marker3.getLatLng().lat +
      '</div><div>longitude:' + this.marker3.getLatLng().lng + '</div>');
      this.marker4.bindPopup('<div>latitude:' + this.marker4.getLatLng().lat +
      '</div><div>longitude:' + this.marker4.getLatLng().lng + '</div>');

      this.marker.bindTooltip('<div>latitude:' + this.marker.getLatLng().lat +
      '</div><div>longitude:' + this.marker.getLatLng().lng + '</div>');
      this.marker2.bindTooltip('<div>latitude:' + this.marker2.getLatLng().lat +
      '</div><div>longitude:' + this.marker2.getLatLng().lng + '</div>');
      this.marker3.bindTooltip('<div>latitude:' + this.marker3.getLatLng().lat +
      '</div><div>longitude:' + this.marker3.getLatLng().lng + '</div>');
      this.marker4.bindTooltip('<div>latitude:' + this.marker4.getLatLng().lat +
      '</div><div>longitude:' + this.marker4.getLatLng().lng + '</div>');
  }

  makePolygon() {
      // create a red polygon from an array of LatLng points
      if (this.polygon) {
          this.map.removeLayer(this.polygon);
      }

      const latlngs = [[this.marker.getLatLng().lat, this.marker.getLatLng().lng],
      [this.marker2.getLatLng().lat, this.marker2.getLatLng().lng],
      [this.marker3.getLatLng().lat, this.marker3.getLatLng().lng],
      [this.marker4.getLatLng().lat, this.marker4.getLatLng().lng]];
      this.polygon = L.polygon(latlngs, {color: 'red'}).addTo(this.map);
      // zoom the map to the polygon
      this.map.fitBounds(this.polygon.getBounds());
  }

  sendInputLocation() {
    const locationPoints = [];

    locationPoints.push({
        latitude: this.marker.getLatLng().lat,
        longitude: this.marker.getLatLng().lng
    });

    locationPoints.push({
        latitude: this.marker2.getLatLng().lat,
        longitude: this.marker2.getLatLng().lng
    });

    locationPoints.push({
        latitude: this.marker3.getLatLng().lat,
        longitude: this.marker3.getLatLng().lng
    });

    locationPoints.push({
        latitude: this.marker4.getLatLng().lat,
        longitude: this.marker4.getLatLng().lng
    });

    console.log(locationPoints);
    this.inputLocationEvent.emit(locationPoints);
  }

  getCountryLocation(data: string) {
    switch (data) {
      case 'Tunisia':
        this.map.setView([36.799663, 10.182846]);
        break;
      case 'Algeria':
        this.map.setView([36.765842, 3.053191]);
        break;
      case 'Morocco':
        this.map.setView([34.029260, -6.835771
        ]);
        break;
      case 'Portugal':
        this.map.setView([38.707465, -9.136446]);
        break;
    }
  }

  constructor() { }

  ngAfterViewInit(): void {
      this.initMap();
      this.makeCapitalMarkers(this.map);
      this.makeMarkersPopUp();
      this.makePolygon();
  }

}
