// stores the mapping of participant -> attributeName, and taskId -> attributeName in a cookie
const updateConfig = (config) => {
   const date = new Date();
   date.setTime(date.getTime() + (1 * 1 * 60 * 60 * 1000)); // 1 hour in milliseconds
   const expires = `expires=${date.toUTCString()}`;
   document.cookie = `config=${JSON.stringify({ config })};path=/;${expires}`;
}

// returns the mapping of participant -> attributeName, and taskId -> attributeName
const getConfig = () => {
   const cookies = document.cookie.split('; ');
   const config = cookies.find(cookie => cookie.startsWith('config='));
   if (config) {
      return JSON.parse(config.split('=')[1]);
   }
   return {};
}

// stores the mapping of attributeName to metaphor selection in a cookie
const updateMapping = (config) => {
   const date = new Date();
   date.setTime(date.getTime() + (1 * 1 * 60 * 60 * 1000)); // 1 hour in milliseconds
   const expires = `expires=${date.toUTCString()}`;
   document.cookie = `mapping=${JSON.stringify({ config })};path=/;${expires}`;
}

// returns the mapping of attributeName to metaphor selection
const getMapping = () => {
   const cookies = document.cookie.split('; ');
   const mapping = cookies.find(cookie => cookie.startsWith('mapping='));
   if (mapping) {
      return JSON.parse(mapping.split('=')[1]);
   }
   return {};
}

export { updateConfig, getConfig, updateMapping, getMapping };