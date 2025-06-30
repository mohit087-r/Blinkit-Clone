import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../componets/Input';
import { validateEmail } from '../utils/validateEmail';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SubmitLoader from '../componets/SubmitLoader';
import SummaryApi from '../common/SummaryApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsButtonDisabled(!email.trim());
    }, [email]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    setLoader(true);
    try {
        const response = await Axios({
            method: SummaryApi.forgot_password.method,
            url: SummaryApi.forgot_password.url,
            data: { email },
        });

        if (response.data.error) {
            toast.error(response.data.message);
            setLoader(false);
            return;
        }

        if (response.data.success) {
            toast.success(response.data.message);
            setLoader(false);
            navigate('/verify-otp', {state : {email}});
            setEmail('');
        }
    } catch (error) {
        AxiosToastError(error);
        setLoader(false);
    }
  };

  return (
    <section className=' w-full container mx-auto px-2 md:mt-20'>
      <div className='mt-30 bg-white my-4 w-full max-w-[450px] mx-auto rounded-xl p-6 shadow'>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <p className='text-2xl text-slate-800 font-bold text-center'>
            Forgot Password
          </p>

          <Input
            type='text'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='mohit@gmail.com'
          />

          <button
            type='submit'
            disabled={isButtonDisabled}
            className={`${
              isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-700 hover:bg-green-600'
            } text-white px-5 py-2 w-full rounded-lg transition-all`}
          >
            {loader ? <SubmitLoader /> : 'Send OTP'}
          </button>

          <p className='text-slate-700 text-sm text-center mt-2'>
            You’ll receive a 6-digit OTP on your email to reset your password.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
