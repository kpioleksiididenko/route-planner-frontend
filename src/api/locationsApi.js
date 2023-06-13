import api from "./util";

const all = async () => await api.get('locations/all');

const locationsApi = {all};
export default locationsApi;