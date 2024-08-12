const tokenMap = {
  "notes": "n",
  "id": "i",
  "label": "l",
  "content": "c",
  "createdAt": "ca",
  "position": "p",
  "x": "x",
  "y": "y",
  "isBeingDragged": "d",
  "size": "s",
  "width": "w",
  "height": "h",
  "isBeingResized": "r",
  "resizeDirection": "rd",
  "isPinned": "ip",
  "appearence": "a",
  "opacity": "o",
  // Add more mappings as needed
};
const reverseTokenMap = Object.entries(tokenMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

console.log(reverseTokenMap);


function tokenizeObject(obj, tokenMap) {
  if (Array.isArray(obj)) {
    return obj.map(item => tokenizeObject(item, tokenMap));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const token = tokenMap[key] || key;
      acc[token] = tokenizeObject(obj[key], tokenMap);
      return acc;
    }, {});
  }
   return obj;
}

function detokenizeObject(obj, reverseTokenMap) {
  if (Array.isArray(obj)) {
    return obj.map(item => detokenizeObject(item, reverseTokenMap));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const originalKey = reverseTokenMap[key] || key;
      acc[originalKey] = detokenizeObject(obj[key], reverseTokenMap);
      return acc;
    }, {});
  }
  return obj;
}
