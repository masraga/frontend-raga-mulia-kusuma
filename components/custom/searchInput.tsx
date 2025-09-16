"use client";

import { appContext } from "@/app/layout";
import React from "react";
import { Input } from "../ui/input";
import { ICountry } from "@/api/product";

type props = {
  label: string;
  id: string;
  placeholder: string;
  onChange: any;
  value: string;
  onSelectValue: any;
  setShowInput: any;
  showInput: boolean;
  itemList: any[];
};

export default function SearchInput(props: props) {
  const context = React.useContext(appContext);
  return (
    <div className="w-full relative">
      <label
        htmlFor={props.id}
        className="font-medium cursor-pointer"
        onClick={props.setShowInput}
      >
        {`${props.label} ${props.value}`}
      </label>
      <div
        className={`absolute bg-white shadow w-full p-2 z-10 bg-white ${
          props.showInput ? "" : "hidden"
        }`}
      >
        <Input
          className="outline-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none shadow-none"
          placeholder={props.placeholder}
          id={props.id}
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
        />
        {props.itemList.map((v, i) => {
          return (
            <div
              key={i}
              className="mb-2 hover:font-medium hover:bg-neutral-100 cursor-pointer p-2"
              onClick={() => props.onSelectValue(v)}
            >
              {v.name.toLowerCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
