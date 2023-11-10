import axios from "axios";
import { ResponseError } from "../error/response-error.js";

const getLocationService = async (loc, ip) => {
  const { latitude, longitude } = loc || {
    latitude: 0,
    longitude: 0,
  };

  try {
    const ipGeolocationResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${ip}`
    );

    return {
      latitude: latitude,
      longitude: longitude,
      name: `${ipGeolocationResponse.data.city}, ${ipGeolocationResponse.data.country_name}`,
    };
  } catch (e) {
    throw new ResponseError(500, "Something went wrong.");
  }
};

export { getLocationService };
