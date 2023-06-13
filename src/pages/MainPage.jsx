import { Icon, LatLng } from 'leaflet';
import { Marker, Polyline, Popup } from 'react-leaflet';
import ReportBrowser from '../components/ReportBrowser';
import { useEffect, useState } from 'react';
import MapElement from '../components/MapElement';

const MainPage = () => {
  // TODO load from local storage
  const [selectedReports, setSelectedReports] = useState([]);
  const [reportToPath, setReportToPath] = useState(new Map());
  const lineDashPattern = [5];
  const noDashesLinePatter = [];

  //TODO add custom markers
  const markerIcon = new Icon({
    iconUrl: 'images/dot.svg',
    iconSize: [50, 50],
  });
  const pathColors = ['blue', 'red', 'yellow', 'purple', 'black', 'grey'];

  useEffect(() => {
    const addedReports = selectedReports.filter(
      (report) => !reportToPath.has(report)
    );
    const removedReports = Array.from(reportToPath.keys()).filter(
      (report) => !selectedReports.includes(report)
    );

    const reportToPathTransformed = new Map(reportToPath);
    addedReports.forEach((report) => {
      const path = genPath(report);
      reportToPathTransformed.set(report, path);
    });
    removedReports.forEach((report) => {
      reportToPathTransformed.delete(report);
    });

    setReportToPath(reportToPathTransformed);
    // TODO fix warning
  }, [selectedReports]);

  const genPath = (report) => {
    console.log(report);
    const markers = [];
    const markerLinks = [];
    let lastKnowCoordinates = undefined;
    // we skip stops what have no coordinates
    let skippedStops = [];

    for (const [i, stop] of report.route.stops.entries()) {
      const coordinates = getCoordinates(stop);
      if (!coordinates) {
        // if there was no coordinates yet we haven't skipped anything
        if (lastKnowCoordinates) {
          skippedStops.push(stop);
        }
        continue;
      }

      if (lastKnowCoordinates) {
        const linkKey = `polyline_s${i}_r${report.id}`;
        const link = genStopsLink(
          lastKnowCoordinates,
          coordinates,
          skippedStops,
          linkKey
        );
        markerLinks.push(link);
        skippedStops = [];
      }

      const marker = (
        <Marker
          position={coordinates}
          key={`marker_s${i}_r${report.id}`}
          icon={markerIcon}
        >
          <Popup>{stop.name}</Popup>
        </Marker>
      );
      markers.push(marker);

      lastKnowCoordinates = coordinates;
    }
    return { markers: markers, lines: markerLinks };
  };

  const getCoordinates = (reportStop) => {
    const location = reportStop.location;
    if (location.latitude && location.longitude) {
      return new LatLng(location.latitude, location.longitude);
    }
    return undefined;
  };

  const genStopsLink = (from, to, skippedStops, key) => {
    const stopsWereSkipped = () => skippedStops.length !== 0;

    const getPolylineColor = () => {
      return pathColors[reportToPath.size % pathColors.length];
    };

    return (
      <Polyline
        positions={[from, to]}
        dashArray={stopsWereSkipped() ? lineDashPattern : noDashesLinePatter}
        key={key}
        color={getPolylineColor()}
      >
        {stopsWereSkipped() && (
          <Popup>
            Skipped stops:
            <ol>
              {skippedStops.map((stop, i) => (
                <li key={i}>{stop.name}</li>
              ))}
            </ol>
          </Popup>
        )}
      </Polyline>
    );
  };

  //TODO fix incorrect point assign when names are same (backend)

  return (
    <>
      <MapElement reportToPath={reportToPath} />
      <ReportBrowser
        selectedReports={selectedReports}
        setSelectedReports={setSelectedReports}
      />
    </>
  );
};

export default MainPage;
