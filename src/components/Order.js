import moment from 'moment';
import React from 'react';
import Currency from 'react-currency-formatter'

const Order = ({ id, amount, amountShipping, images, items, timestamp }) => {
    console.log('image', images);
    return (
        <div className='relative rounded-md border'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className='text-sm font-bold'>TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency='USD' /> -Next day delivery
                        <Currency quantity={amountShipping} currency='USD' /> -Next day delivery
                    </p>
                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items.length} items</p>
                <p className='text-xs whitespace-nowrap absolute top-2 right-2 w-40 lg:w-72 truncate'>ORDER # {id}</p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {
                        images.map(image => <img src={image} className='object-contain h-20 sm:h-32'/>)
                    }
                </div>

            </div>
        </div>
    );
};

export default Order;