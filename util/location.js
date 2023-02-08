import {GOOGLE_API, API_SETTINGS, GOOGLE_API_KEY } from "@env"

export async function getMapPreview(lat, lng){
  const imagePreviewUrl = `${GOOGLE_API}${lat},${lng}${API_SETTINGS}${lat},${lng}${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export async function getAdress(lat,lng){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${lat},${lng}&key=YourPiKey`;
  const response = await fetch(url)

  if (!response.ok){
    throw new Error('failed to fetch address!')
  }

  const data = await response.json();
  const adress = data.results[0].formatted_address;

  return adress
}
// None of this code has been tested due to the fact i dont agree with signing up to a free service with a credit card. blame google. 