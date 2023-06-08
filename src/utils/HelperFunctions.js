import configData from "./../config.json";
import axios from "axios";
import * as dateFns from "date-fns";

const baseUrl = configData.url.baseURL;
const getImages = configData.url.getOperatorImage;
const url = `${baseUrl}${getImages}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

export const trimId = (id) => {
  const firstChars = id.substring(0, 2).toUpperCase();
  const lastChar = id[id.length - 1];
  return `${firstChars}_${lastChar}`;
};

export const fixFloat = (decimalPlaces, number) => {
  let multiplier = 10 * 10 ** decimalPlaces;
  return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const formatTime = (milliSeconds) => {
  const hours = dateFns.millisecondsToHours(milliSeconds);
  const minutes = dateFns.millisecondsToMinutes(milliSeconds) % 60;
  const seconds = dateFns.millisecondsToSeconds(milliSeconds)%60;
  
  return `${hours < 10 ? hours : hours} hr, ${
    minutes
  } min, ${seconds} sec`;
};

export const getStaffImage = async (imageId) => {
  try {
    const response = await axios.request({
      url: `${url}?image-id=${imageId}`,
      method: "get",
      headers,
    });
    // const resBlob = response.blob();
    // const blobImg = new Blob([response.data],{type:'image/webp'});
    // console.log(blobImg)
    // console.log(URL.createObjectURL(resBlob));
    // console.log(response);
    // const encodedResponse = Buffer.from(response.data).toString('base64');
    // console.log("encoded response",encodedResponse)
    // console.log("encoded response", response);
    return response.data;
  } catch (err) {
    let error;
    if (err.response) error = err.response.data;
    else
      error = {
        message: err.message,
        error: {
          statusCode: 408,
          status: "time out",
        },
      };
    return error;
  }
};
