import api from './util';

const all = async () => await api.get('reports/all');

export const reportsApi = { all };
