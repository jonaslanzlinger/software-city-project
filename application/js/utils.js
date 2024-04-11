const formatDate = date => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   const seconds = String(date.getSeconds()).padStart(2, "0");
   const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

   return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

/**
 * Method to convert RGB to HSL
 * 
 * @param {number} r // between 0-255
 * @param {number} g // between 0-255 
 * @param {number} b // between 0-255 
 * @returns {array[float]} // array of floats [h, s, l] where h is between 0-360, s is between 0-100 and l is between 0-100
 */
const rgbToHsl = (r, g, b) => {
   r /= 255, g /= 255, b /= 255;
   var max = Math.max(r, g, b), min = Math.min(r, g, b);
   var h, s, l = (max + min) / 2;

   if (max == min) {
      h = s = 0;
   } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
         case g: h = (b - r) / d + 2; break;
         case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
   }
   return [h * 360, s * 100, l * 100];
}

/**
 * Method to convert a timestamp to a date in the format "YYYY-MM-DD, HH:MM:SS:SSS"
 * 
 * @param {string} timestamp // timestamp in the format "YYYYMMDDHHmmssSSS"
 * @returns {Date} // Date in the format "YYYY-MM-DD, HH:MM:SS:SSS"
 */
const timestampToDate = timestamp => {
   let year = parseInt(timestamp.substring(0, 4));
   // substraction of 1 because the month is zero-based
   let month = parseInt(timestamp.substring(4, 6)) - 1;
   let day = parseInt(timestamp.substring(6, 8));
   let hour = parseInt(timestamp.substring(8, 10));
   let minute = parseInt(timestamp.substring(10, 12));
   let second = parseInt(timestamp.substring(12, 14));
   let millisecond = parseInt(timestamp.substring(14));
   return new Date(year, month, day, hour, minute, second, millisecond);
}

export { formatDate, rgbToHsl, timestampToDate }