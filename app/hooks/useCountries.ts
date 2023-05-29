import { dataPromise } from '../components/navbar/Categories';
import { use } from 'react';



const useCountries = () => {
  const data = use(dataPromise)
  const formattedCountries = data.data?.map(item => ({ label: item.info.location.city, region: item.info.location.country.code, flag: "&#127482;", value: item.info.location.city, latlng: [item.info.location.lat, item.info.location.long] }))
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries?.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;
