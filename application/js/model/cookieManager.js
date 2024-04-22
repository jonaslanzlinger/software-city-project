import { v4 as uuidv4 } from 'uuid';
import { getAttributeNames } from './dataManagement/data';

// stores the config (groupingPath, timestamp, participant, taskId)
const updateConfig = config => {
   const date = new Date();
   date.setTime(date.getTime() + (1 * 1 * 60 * 60 * 1000)); // 1 hour in milliseconds
   const expires = `expires=${date.toUTCString()}`;
   let attributeNames = getAttributeNames();
   const data = {
      attributeNames,
      config
   };
   const uuid = uuidv4();
   let name = `config-${uuid}`;

   // get config cookie where all attribute names are the same
   let oldConfig = getConfig();
   if (oldConfig.length > 0) {
      name = oldConfig[0].split('=')[0];
   }
   document.cookie = `${name}=${JSON.stringify(data)};path=/;${expires}`;
}

// returns the config where all attribute names are the same
const getConfig = () => {
   const cookies = document.cookie.split('; ');
   // get all cookies that start with 'config-'
   const configs = cookies.filter(cookie => cookie.startsWith('config-'));
   // get now the config that has the same attribute names as the attribute names
   configs.forEach(entry => {
      const entryNamesSorted = JSON.parse(entry.split('=')[1]).attributeNames.sort().toString();
      const attributeNamesSorted = getAttributeNames().sort().toString();

      if (entryNamesSorted === attributeNamesSorted) {
         return entry;
      }
   });
   return configs;
}

// stores the mapping of metaphors to attributes
const updateMapping = mapping => {
   const date = new Date();
   date.setTime(date.getTime() + (1 * 1 * 60 * 60 * 1000)); // 1 hour in milliseconds
   const expires = `expires=${date.toUTCString()}`;
   let attributeNames = getAttributeNames();
   const data = {
      attributeNames,
      mapping
   };
   const uuid = uuidv4();
   let name = `mapping-${uuid}`;

   // get mapping cookie where all attribute names are the same
   let oldMapping = getMapping();
   if (oldMapping.length > 0) {
      name = oldMapping[0].split('=')[0];
   }
   document.cookie = `${name}=${JSON.stringify(data)};path=/;${expires}`;
}

// returns the mapping where all attribute names are the same
const getMapping = () => {
   const cookies = document.cookie.split('; ');
   // get all cookies that start with 'mapping-'
   const mappings = cookies.filter(cookie => cookie.startsWith('mapping-'));
   // get now the mapping that has the same attribute names as the provided attributeNames parameter
   mappings.forEach(entry => {
      const entryNamesSorted = JSON.parse(entry.split('=')[1]).attributeNames.sort().toString();
      const attributeNamesSorted = getAttributeNames().sort().toString();

      if (entryNamesSorted === attributeNamesSorted) {
         return entry;
      }
   });
   return mappings;
}

export { updateConfig, getConfig, updateMapping, getMapping };