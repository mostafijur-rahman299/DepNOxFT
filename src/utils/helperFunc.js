import {Platform} from 'react-native';
import mime from 'mime';

export const createFormData = (
  body = {},
  photo = {uri: null, fieldName: ''},
) => {
  const data = new FormData();

  if (photo.uri !== null) {
    let localUri = photo.uri;
    data.append(photo.fieldName, {
      uri: Platform.OS === 'ios' ? localUri.replace('file://', '') : localUri,
      name: localUri.split('/').pop(),
      type: mime.getType(localUri),
    });
  }

  Object.keys(body).forEach(key => {
    if (![null, undefined].includes(body[key])) {
      data.append(key, body[key]);
    }
  });

  return data;
};

export const getNaturalDate = dateObj => {
  var date = `${dateObj.getDate()}`.padStart(2, '0');
  var month = `${dateObj.getMonth() + 1}`.padStart(2, '0'); // January is 0.
  var year = dateObj.getFullYear();
  return `${date}/${month}/${year}`;
};

export const generateUuId = length => {
  var u = '',
    m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    i = 0,
    rb = (Math.random() * 0xffffffff) | 0;
  while (i++ < length) {
    var c = m[i - 1],
      r = rb & 0xf,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    u += c == '-' || c == '4' ? c : v.toString(16);
    rb = i % 8 == 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  return u;
};
