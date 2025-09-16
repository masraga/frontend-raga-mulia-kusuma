"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ICountry, IHarbor, IProduct } from "@/api/product";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type IContext = {
  setCountry: any;
  country: string;
  setSelectedCountry: any;
  selectedCountry: string;
  setCountryList: any;
  countryList: ICountry[];
  setIsClickCountry: any;
  isClickCountry: boolean;

  setHarbor: any;
  harbor: string;
  setSelectedHarbor: any;
  selectedHarbor: string;
  setHarborList: any;
  harborList: IHarbor[];
  setIsClickHarbor: any;
  isClickHarbor: boolean;

  setProduct: any;
  product: string;
  setSelectedProduct: any;
  selectedProduct: string;
  setProductList: any;
  productList: IProduct[];
  setIsClickProduct: any;
  isClickProduct: boolean;
};

const contextArgument: IContext = {
  setCountry: null,
  country: "",
  countryList: [],
  setCountryList: null,
  setSelectedCountry: null,
  selectedCountry: "",
  setIsClickCountry: null,
  isClickCountry: false,

  setHarbor: null,
  harbor: "",
  harborList: [],
  setHarborList: null,
  setSelectedHarbor: null,
  selectedHarbor: "",
  setIsClickHarbor: null,
  isClickHarbor: false,

  setProduct: null,
  product: "",
  productList: [],
  setProductList: null,
  setSelectedProduct: null,
  selectedProduct: "",
  setIsClickProduct: null,
  isClickProduct: false,
};

export const appContext = React.createContext(contextArgument);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [country, setCountry] = React.useState<string>("");
  const [selectedCountry, setSelectedCountry] = React.useState<string>("");
  const [isClickCountry, setIsClickCountry] = React.useState<boolean>(false);
  const [countryList, setCountryList] = React.useState<ICountry[]>([]);

  const [harbor, setHarbor] = React.useState<string>("");
  const [selectedHarbor, setSelectedHarbor] = React.useState<string>("");
  const [isClickHarbor, setIsClickHarbor] = React.useState<boolean>(false);
  const [harborList, setHarborList] = React.useState<IHarbor[]>([]);

  const [product, setProduct] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] = React.useState<string>("");
  const [isClickProduct, setIsClickProduct] = React.useState<boolean>(false);
  const [ProductList, setProductList] = React.useState<IProduct[]>([]);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <appContext.Provider
          value={{
            setCountry: setCountry,
            country,
            countryList: countryList,
            setCountryList,
            selectedCountry,
            setSelectedCountry,
            isClickCountry,
            setIsClickCountry,

            setHarbor: setHarbor,
            harbor,
            harborList: harborList,
            setHarborList,
            selectedHarbor,
            setSelectedHarbor,
            isClickHarbor,
            setIsClickHarbor,

            setProduct: setProduct,
            product,
            productList: ProductList,
            setProductList,
            selectedProduct,
            setSelectedProduct,
            isClickProduct,
            setIsClickProduct,
          }}
        >
          {children}
        </appContext.Provider>
      </body>
    </html>
  );
}
