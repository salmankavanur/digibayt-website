'use client';

import { useState, useEffect } from 'react';

interface CountryPhoneMapping {
  [key: string]: string;
}

// Define phone numbers for different countries
const COUNTRY_PHONE_MAPPING: CountryPhoneMapping = {
  // Default number
  DEFAULT: '+919074433100',
  // United Arab Emirates
  AE: '+971542950594',
  // Add more country codes as needed
  // US: '+1xxxxxxxxxx',
  // UK: '+44xxxxxxxxx',
};

export function useCountryPhone() {
  const [phoneNumber, setPhoneNumber] = useState<string>(COUNTRY_PHONE_MAPPING.DEFAULT);
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function detectCountry() {
      try {
        // Use a free geolocation API service
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const countryCode = data.country_code;
        setCountry(countryCode);
        
        // Set the phone number based on country or use default
        if (countryCode && COUNTRY_PHONE_MAPPING[countryCode]) {
          setPhoneNumber(COUNTRY_PHONE_MAPPING[countryCode]);
        } else {
          setPhoneNumber(COUNTRY_PHONE_MAPPING.DEFAULT);
        }
      } catch (error) {
        console.error('Error detecting country:', error);
        // Use default number if detection fails
        setPhoneNumber(COUNTRY_PHONE_MAPPING.DEFAULT);
      } finally {
        setLoading(false);
      }
    }

    detectCountry();
  }, []);

  return { phoneNumber, country, loading };
}
