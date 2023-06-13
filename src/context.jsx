import { createContext, useContext, useEffect, useState } from 'react';
import userApi from './api/userApi';
import locationsApi from './api/locationsApi';
import { reportsApi } from './api/reportsApi';

export const AppContext = createContext(null);

export const AppContextProvier = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [locations, setLocations] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const effectFunction = async () => setIsLogged(await userApi.isLogged());
    effectFunction();
  }, []);

  useEffect(() => {
    const effectFunction = async () => {
      const response = await locationsApi.all();
      // TODO add error handling
      if (response.ok) {
        setLocations(await response.json());
      }
    };
    effectFunction();
  }, []);

  useEffect(() => {
    const effectFunction = async () => {
      const response = await reportsApi.all();
      // TODO add error handling
      if (response.ok) {
        setReports(await response.json());
      }
    };
    effectFunction();
  }, []);

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged, locations, reports }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
