import { useForm } from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../auth/auth'


const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const onSubmit = async(data,e) => {
    console.log(data)
    e.preventDefault()
    try {
      const user = await login(email, password)
      if (user) {
        navigate("/mainpage") 
      }
    } catch (err) {
      setError('Invalid email or password')
    }
    // يتم إرسال بيانات تسجيل الدخول إلى السيرفر
    reset()
    
  }

  return (
    <div className="py-8 flex flex-col items-center justify-center bg-fuchsia-50 bg-opacity-50 mb-12">
    
    <div className="text-center mt-14">
      <h1 className="text-xl md:text-3xl font-bold text-teal-900 font-mono mb-4">LOGIN</h1>
    </div>
    <form className="w-full pl-20 md:pl-0 md:px-0  max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-4">
        <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-[80%]  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-[80%]  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Your passsword"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
      </div>
      <div className='flex justify-center mr-14 md:mr-0 text-blue-900 font-garmond underline mb-4'><Link>Forgot your password ?</Link></div>
      <div className='flex justify-center mr-14 md:mr-0 text-blue-900 font-garmond  mb-4'><Link to='/register'>if you don't have an account sign up</Link></div>
      <div className="flex items-center justify-center mr-12 md:mr-0 mt-12">
        <button
          className="bg-teal-600 hover:bg-blue-700 text-white  font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          LOGIN
        </button>
      </div>
    </form>
  </div>

  );
};

export default Login;
