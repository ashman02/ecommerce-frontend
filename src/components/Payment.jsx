import React, { useState } from 'react'
import Button from './Button';

const Payment = () => {

    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    return (
        <div>
            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="upi"
                            value="upi"
                            checked={selectedMethod === 'upi'}
                            onChange={handleMethodChange}
                            className="mr-2"
                        />
                        <label htmlFor="upi" className="cursor-pointer">UPI</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="creditCard"
                            value="creditCard"
                            checked={selectedMethod === 'creditCard'}
                            onChange={handleMethodChange}
                            className="mr-2"
                        />
                        <label htmlFor="creditCard" className="cursor-pointer">Credit Card</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="cashOnDelivery"
                            value="cashOnDelivery"
                            checked={selectedMethod === 'cashOnDelivery'}
                            onChange={handleMethodChange}
                            className="mr-2"
                        />
                        <label htmlFor="cashOnDelivery" className="cursor-pointer">Cash on Delivery</label>
                    </div>
                </div>
                {selectedMethod === "creditCard" && (
                    <div className="container mx-auto py-8">
                    <h2 className="text-2xl font-semibold mb-4">Enter Credit Card Details</h2>
                    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="px-6 py-4">
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter card number"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="expiry" className="block text-gray-700 font-bold mb-2">Expiration Date</label>
                          <input
                            type="text"
                            id="expiry"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter CVV"
                          />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "upi" && (
                     <div className="container mx-auto py-8">
                     <h2 className="text-2xl font-semibold mb-4">Pay via UPI</h2>
                     <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                       <div className="px-6 py-4">
                         <div className="mb-4">
                           <label htmlFor="upiId" className="block text-gray-700 font-bold mb-2">UPI ID</label>
                           <input
                             type="text"
                             id="upiId"
                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             placeholder="Enter UPI ID"
                           />
                         </div>
                         <div className="mb-4">
                           <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Amount</label>
                           <input
                             type="text"
                             id="amount"
                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             placeholder="Enter amount"
                           />
                         </div>
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                           Pay Now
                         </button>
                       </div>
                     </div>
                   </div>
                )}
                {selectedMethod === "cashOnDelivery" && (
                    <div className='container mx-auto py-8'>
                        <h2 className="text-2xl font-semibold mb-4">Cash on Delivery</h2>
                        <p>
                            10 cents handling cost and you can pay via upi when our delivery guy will arrive for delivery.
                        </p>
                        <div className='text-center mt-10'>
                            <Button bg='bg-slate-900'
                            handleClick={()=> alert("Thank you for visiting our website. It will be a pleasure to help you if you want, contact anytime.")}>Confirm Order</Button>
                            {/* Make a stylish pop up bro */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payment
