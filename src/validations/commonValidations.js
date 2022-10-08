export const isEmpty = value => {
  if ([null, undefined, ''].includes(value)) {
    return true;
  }
  if (typeof value === 'string') {
    return value?.trim()?.length === 0;
  }
  return false;
};

export function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) {
    return true;
  } else {
    return false;
  }
}
