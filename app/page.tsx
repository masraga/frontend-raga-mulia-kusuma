"use client";

import {
  getCountry,
  getHarbor,
  getProduct,
  ICountry,
  IHarbor,
} from "@/api/product";
import SearchInput from "@/components/custom/searchInput";
import React from "react";
import { appContext } from "./layout";

export default function Home() {
  const context = React.useContext(appContext);
  const [description, setDescription] = React.useState<string>();
  const [disc, setDisc] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);

  React.useEffect(() => {
    getCountry().then((result) => {
      if (result) {
        if (context.country != "") {
          context.setCountryList(
            result.filter((v) =>
              v.nama_negara.toLowerCase().startsWith(context.country)
            )
          );
        } else {
          context.setCountryList(result);
        }
      }
    });
  }, [context.country]);

  const handleClickCountry = () => {
    context.setIsClickCountry(!context.isClickCountry);
  };

  const handleSelectCountry = (value: { name: string; id: string }) => {
    context.setCountry(value.name.toLocaleLowerCase());
    context.setSelectedCountry(value.id);
    context.setIsClickCountry(false);

    getHarbor(value.id).then((result) => {
      context.setHarborList(result);
    });
  };

  const handleClickHarbor = () => {
    context.setIsClickHarbor(!context.isClickHarbor);
  };

  const handleSelectHarbor = (value: { name: string; id: string }) => {
    context.setHarbor(value.name.toLocaleLowerCase());
    context.setSelectedHarbor(value.id);
    context.setIsClickHarbor(false);

    getProduct(value.id).then((result) => {
      context.setProductList(result);
    });
  };

  const handleClickProduct = () => {
    context.setIsClickProduct(!context.isClickProduct);
  };

  const handleSelectProduct = (value: { name: string; id: string }) => {
    context.setProduct(value.name.toLocaleLowerCase());
    context.setSelectedProduct(value.id);
    context.setIsClickProduct(false);
    const product = value.id.split("^");
    setDescription(product[1]);
    setDisc(Number(product[2]));

    const fixPrice =
      Number(product[2]) > 0
        ? Number(product[3]) - (Number(product[3]) * Number(product[2])) / 100
        : product[3];
    setPrice(Number(fixPrice));
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div>
          <h1 className="text-center text-2xl font-bold">Technical Test</h1>
          <div className="p-5 shadow rounded w-[95%] lg:w-[500px]">
            <form>
              <SearchInput
                label="Cari negara: "
                placeholder="cari negara..."
                id="negara"
                onChange={context.setCountry}
                value={context.country}
                onSelectValue={handleSelectCountry}
                setShowInput={handleClickCountry}
                showInput={context.isClickCountry}
                itemList={context.countryList.map((v) => {
                  return { id: v.id_negara, name: v.nama_negara };
                })}
              />
              <br />
              {context.selectedCountry != "" ? (
                <SearchInput
                  label="Cari pelabuhan: "
                  placeholder="cari pelabuhan..."
                  id="pelabuhan"
                  onChange={context.setHarbor}
                  value={context.harbor}
                  onSelectValue={handleSelectHarbor}
                  setShowInput={handleClickHarbor}
                  showInput={context.isClickHarbor}
                  itemList={context.harborList.map((v) => {
                    return { id: v.id_pelabuhan, name: v.nama_pelabuhan };
                  })}
                />
              ) : (
                <></>
              )}
              <br />
              {context.selectedHarbor != "" ? (
                <>
                  <SearchInput
                    label="Cari barang: "
                    placeholder="cari barang..."
                    id="barang"
                    onChange={context.setProduct}
                    value={context.product}
                    onSelectValue={handleSelectProduct}
                    setShowInput={handleClickProduct}
                    showInput={context.isClickProduct}
                    itemList={context.productList.map((v) => {
                      return {
                        id: `${v.id_barang}^${v.description}^${v.diskon}^${v.harga}`,
                        name: v.nama_barang,
                      };
                    })}
                  />
                </>
              ) : (
                <></>
              )}
              <br />
              {context.selectedProduct != "" ? (
                <>
                  <label htmlFor="" className="font-medium">
                    Deskripsi: {description}
                  </label>
                </>
              ) : (
                <></>
              )}
              <br />
              <br />
              {context.selectedProduct != "" ? (
                <>
                  <label htmlFor="" className="font-medium">
                    Diskon: {disc}%
                  </label>
                </>
              ) : (
                <></>
              )}
              <br />
              <br />
              {context.selectedProduct != "" ? (
                <>
                  <label htmlFor="" className="font-medium">
                    Total: Rp{new Intl.NumberFormat("id-ID").format(price)}
                  </label>
                </>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
