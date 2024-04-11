import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests

const AddressForm = () => {
  const [address, setAddress] = useState({
    mobileNo : '',
    email : '',
    state: '',
    city: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
  });

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (address.pincode.length === 6) {
      axios.get(`https://api.postalpincode.in/pincode/${address.pincode}`)
        .then(response => {
          if (response.data[0].Status === 'Success') {
            const { State, Block } = response.data[0].PostOffice[0];
            setAddress({
              ...address,
              state: State,
              city: Block,
            });
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [address.pincode]);

  return (
    <div className="lg:max-w-[60%] md:max-w-[80%] max-w-[97%] mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Enter Address</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine">Mobile No.</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mobileNo"
          type="tel"
          placeholder="Enter your mobile No."
          name="mobileNo"
          value={address.mobileNo}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine">Email</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={address.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine">Address Line 1</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="addressLine1"
          type="text"
          placeholder="village, colony etc."
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine">Address Line 2</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="addressLine2"
          type="text"
          placeholder="landmark like bank, public park etc."
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">Pincode</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pincode"
          type="text"
          placeholder="Enter your pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleInputChange}
          maxLength={6}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="city"
          type="text"
          placeholder="City"
          name="city"
          value={address.city}
          onChange={handleInputChange}
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="state"
          type="text"
          placeholder="State"
          name="state"
          value={address.state}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default AddressForm;
