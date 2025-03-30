import { elementTypes } from '../constants/elementTypes';

export const getDefaultProperties = (type) => {
  const element = elementTypes.find(el => el.type === type);
  return element ? {...element.defaultProperties} : {};
};

export const createNewElement = (type, position) => {
  return {
    id: `element-${Date.now()}`,
    type,
    position,
    properties: getDefaultProperties(type)
  };
};