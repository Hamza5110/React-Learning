import { Link } from 'react-router-dom';

function Signup(){
    return (
        <div className='flex items-center justify-center h-screen bg-slate-100'>
            <div className='bg-white w-80 p-6 rounded-xl shadow-lg'>
                <h2 className='text-2xl font-bold text-center mb-5'>Signup</h2>
                <input type="text" placeholder='Username' className='w-full border p-2 rounded mb-4' />
                <input type="text" placeholder='Email' className='w-full border p-2 rounded mb-4' />
                <input type="password" placeholder='Password' className='w-full border p-2 rounded mb-4' />
                <button className='bg-blue-500 text-white rounded-md px-4 w-full py-2 hover:bg-blue-600 transition duration-300'>Login</button>
                <p className='text-center mt-3'>Already Account? { " " } <Link className='text-blue-600 hover:underline' to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;