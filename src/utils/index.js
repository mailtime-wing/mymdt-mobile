import countryCodeData from '@/constants/countryCode';

export function phoneNumberSpliter(phone) {
  let result = phone;
  countryCodeData.find(c => {
    if (!phone.includes(' ') && phone.includes(c.dial_code)) {
      result = c.dial_code + ' ' + phone.split(c.dial_code)[1];
    }
  });
  return result;
}
