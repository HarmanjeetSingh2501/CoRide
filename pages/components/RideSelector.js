import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from '../../pages/data/carList';
import { useRouter } from "next/router";
import Image from 'next/image';

const RideSelector = (props) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [totalPassengers, setTotalPassengers] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const pickupCoord = props.pickupCoordinate;
    const dropoffCoord = props.dropoffCoordinate;

    if (pickupCoord && dropoffCoord) {
      rideDurationf(props);
    }
  }, [props]);

  const rideDurationf = (props) => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinate[0]},${props.pickupCoordinate[1]};${props.dropoffCoordinate[0]},${props.dropoffCoordinate[1]}?` +
        new URLSearchParams({
          access_token: "pk.eyJ1IjoiaGFybWFuamVldDI1MDEiLCJhIjoiY2xxamhzbXp5MGp6MDJqcnk2ZDQzamx2dyJ9.vle6GRtDw-s2N1_U9GXuAw",
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes[0]) {
          setRideDuration(data.routes[0].duration / 100);
        }
      })
      .catch((error) => {
        console.error("Error fetching ride duration:", error);
      });
  };

  const handleCarClick = (index) => {
    setSelectedCar(index);
  };

  const handleConfirm = () => {
    if (selectedCar !== null) {
      const selectedRide = carList[selectedCar];
      const selectedService = selectedRide ? selectedRide.service : "";
      const multiplier = selectedRide ? selectedRide.multiplier : 0;
      const totalPrice = rideDuration * multiplier;

      const pricePerPassenger = totalPrice / totalPassengers;

      props.onConfirm(selectedRide, totalPassengers, pricePerPassenger);
      router.push(`/payment/page?amount=${pricePerPassenger}`);
    } else {
      console.log("Please select a ride before confirming.");
    }
  };

  const databaseShow = async () => {
    if (selectedCar !== null) {
      const selectedRide = carList[selectedCar];
      const multiplier = selectedRide ? selectedRide.multiplier : 0;
      const totalPrice = rideDuration * multiplier;

      const pricePerPassenger = totalPrice / totalPassengers;

      const rideData = {
        pickupLocation: props.pickupCoordinate,
        dropoffLocation: props.dropoffCoordinate,
        selectedAmount: pricePerPassenger,
      };

      try {
        const response = await fetch("/api/store-rides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rideData),
        });

        if (response.ok) {
          console.log("Ride information stored successfully.");
          router.push(`/payment/page?amount=${pricePerPassenger}`);
        } else {
          console.error("Failed to store ride information.");
        }
      } catch (error) {
        console.error("Error making API request:", error);
      }
    } else {
      console.log("Please select a ride before confirming.");
    }
  };

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index} onClick={() => handleCarClick(index)} selected={selectedCar === index}>
            <Image src={car.imgUrl} alt={`${car.service} car`} height={110} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <CarPrice>{"Rs" + (rideDuration * car.multiplier).toFixed(2)}</CarPrice>
          </Car>
        ))}
      </CarList>
      <PassengerInput
        type="number"
        min="1"
        value={totalPassengers}
        onChange={(e) => setTotalPassengers(parseInt(e.target.value))}
      />
       <ButtonsContainer>
      <ConfirmButton onClick={databaseShow}>
        Confirm {selectedCar !== null ? carList[selectedCar].service : ""}
      </ConfirmButton>
      <ConfirmButton onClick={handleConfirm}>
        Pay {selectedCar !== null ? carList[selectedCar].service : ""}
      </ConfirmButton>
      </ButtonsContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col flex flex-col
`;

const Title = tw.div`
  text-center text-s text-gray-500 border-b py-2
`;
const CarList = tw.div`
  border-b overflow-y-scroll 
`;
const Car = tw.div`
  flex items-center transform hover:scale-105 transition cursor-pointer p-2 px-4 border-black border-[2px] rounded-md hover:border-[2px] ${props => props.selected ? 'bg-gray-200' : 'bg-white'}
`;

const CarDetails = tw.div`
  flex-1 px-8
`;

const Service = tw.div`
  font-semibold
`;

const Time = tw.div`
  text-blue-500 text-xs
`;

const CarPrice = tw.div`
  px-4 text-sm
`;

const ConfirmButton = tw.div`
bg-black flex text-2xl items-center py-5 text-white mt-6 justify-center text-center m-4
transform hover:scale-95 transition cursor-pointer rounded p-4
`;

const ButtonsContainer = tw.div`
flex justify-center mt-4 
`;

const PassengerInput = tw.input`
  border p-2 m-2 text-center transform hover:scale-95 transition cursor-pointer
`;


export default RideSelector;