import { LatLng } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const MapElement = ({reportToPath}) => {
  const carpathiansCenter = new LatLng(48.666, 23.494);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossOrigin=""
      />
      {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
      <script
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossOrigin=""
      ></script>
      <MapContainer
        className="map-container"
        center={carpathiansCenter}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.from(reportToPath.entries()).map(([report, path]) => {
          return (
            <div key={report.id}>
              {path.markers}
              {path.lines}
            </div>
          );
        })}
      </MapContainer>
    </>
  );
}

export default MapElement;