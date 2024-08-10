// file Type Managment section
import moment from "moment";

const fileFormat = (url = "") => {
  // pop removes the last element of the array and returns it
  const fileExtension = url.split(".").pop();

  if (
    fileExtension == "mp4" ||
    fileExtension == "webm" ||
    fileExtension == "ogg"
  ) {
    return "video";
  }

  if (fileExtension == "mp3" || fileExtension == "wav") {
    return "audio";
  }

  if (fileExtension == "pdf") {
    return "pdf";
  }

  if (
    fileExtension == "png" ||
    fileExtension == "jpeg" ||
    fileExtension == "jpg" ||
    fileExtension == "gif"
  ) {
    return "image";
  }

  return "file";
};

const transformImage = (url = "", width = 100) => url;

// Indicates the data from current date to the back last prev 7 days
const getlast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    last7Days.unshift(currentDate.format("MMM D"));
    currentDate.subtract(1, "days");
  }

  return last7Days;
};

// Saving message in localStorage
// when a new message arrives and we have not seen it and when we reload the app the new message notification wipes out so to deal with it we will save it in localStorage

const getOrSaveFromStorage = ({ key, value, get }) => {
  try {
    if (get) {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        try {
          const parseValue = JSON.parse(storedValue);
          return Array.isArray(parseValue) ? parseValue : null;
        } catch (error) {
          console.error(`Error parsing JSON from localStorage: ${error}`);
          return null;
        }
      }
      return null // If no data is found in localstorage
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error with localStorage operations: ${error}`);
    if (get) {
      // If retrieving data, return null or an empty array in case of error
      return null;
    }
  }
};

export { fileFormat, transformImage, getlast7Days, getOrSaveFromStorage };
