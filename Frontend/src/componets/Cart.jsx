import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Cart = () => {
    return (
        <button className='bg-green-700 hover:bg-green-800 flex items-center gap-2 px-3 py-3 rounded text-white cursor-pointer'>
            <div className='animate-bounce'>
                <MdOutlineShoppingCart
                    size={30}
                    className='font-bold'
                />
            </div>
            <div className='font-semibold'>
                <p>My Cart</p>
            </div>
        </button>
    )
}

export default Cart
