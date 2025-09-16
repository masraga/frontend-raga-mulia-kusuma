import api from "./api";

export type ICountry = {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
};

export const getCountry = async () => {
  const request = await api({
    url: "/negaras",
    method: "get",
  });

  return request.data as ICountry[];
};

export type IHarbor = {
  id_negara: number;
  id_pelabuhan: string;
  nama_pelabuhan: string;
};

export const getHarbor = async (id_negara) => {
  const request = await api({
    url: `/pelabuhans?filter={"where" : {"id_negara":${id_negara}}}`,
    method: "get",
  });
  console.log(request.data);
  return request.data as IHarbor[];
};

export type IProduct = {
  id_barang: number;
  nama_barang: string;
  diskon: number;
  harga: number;
  description: number;
};

export const getProduct = async (id_pelabuhan) => {
  const request = await api({
    url: `/barangs?filter={"where" : {"id_pelabuhan":${id_pelabuhan}}}`,
    method: "get",
  });
  console.log(request.data);
  return request.data as IHarbor[];
};
