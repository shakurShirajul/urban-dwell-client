import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Map from "./Map";

const position = [51.505, -0.09];

const Location = () => {
  return (
    <div className="font-roboto" id="location">
      <div className="text-4xl font-extrabold text-gray-800 text-center">
        Apartment Location
      </div>
      <div className="p-5 mx-auto sm:p-10 md:p-16">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <div className="z-[0]">
            <Map />
          </div>
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-xl shadow-lg bg-gray-50 z-[10]">
            <div className="space-y-2">
              <p className="inline-block text-2xl font-semibold sm:text-3xl">
                Location:
              </p>
              <div className="dark:text-gray-800">
                <p>
                  Empire State Building
                  <br />
                  350 5th Avenue
                  <br />
                  New York, NY 10118
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
