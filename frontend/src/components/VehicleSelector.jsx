// components/VehicleSelector.jsx
import React from 'react';
import truck1 from '../assets/images/truck1.png';
import truck2 from '../assets/images/truck2.png';
import { LuCheck } from "react-icons/lu";

const vehicleOptions = [
  {
    label: "Truck 1",
    value: "Truck1",
    image: truck1,
  },
  {
    label: "Truck 2",
    value: "Truck2",
    image: truck2,
  },
];

const VehicleSelector = ({ selected, onChange }) => {
  // Custom handler to send a synthetic event with name/value
  const handleVehicleChange = (value) => {
    onChange({ target: { name: 'vehicle', value } });
  };
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-4">
        Select Vehicle *
      </label>
      {!selected && (
        <p className="text-white text-sm mt-2">Please select a vehicle.</p>
      )}
      <div className="grid grid-cols-2 gap-5">
        {vehicleOptions.map((vehicle) => (
          <label
            key={vehicle.value}
            className="cursor-pointer group relative"
          >
            <input
              type="radio"
              name="vehicle"
              value={vehicle.value}
              checked={selected === vehicle.value}
              onChange={() => handleVehicleChange(vehicle.value)}
              className="peer hidden"
            />

            <div
              className={`relative h-32 rounded-lg border transition-all duration-200 overflow-hidden ${selected === vehicle.value ? 'border-white/80' : 'border-white/20'
                }`}
            >
              <img
                src={vehicle.image}
                alt={vehicle.label}
                className={`w-full h-full object-contain transition-all duration-200 bg-black ${selected === vehicle.value ? 'grayscale-0 opacity-100' : 'grayscale opacity-70'
                  }`}
              />

              {selected === vehicle.value && (
                <div className="absolute top-1.5 right-1.5 bg-white rounded-full p-1">
                  <LuCheck className="h-3 w-3 text-black" />
                </div>
              )}
            </div>

            <p
              className={`text-center mt-1 text-sm transition-colors ${selected === vehicle.value ? 'text-white' : 'text-white/60'
                }`}
            >
              {vehicle.label}
            </p>
          </label>
        ))}
      </div>



    </div>
  );
};

export default VehicleSelector;
