import { useForm } from 'react-hook-form'
import { useRegisterUserMutation } from '../sevices/apiSlice'

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const password = watch("password", "")
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterUserMutation() 
  const [successMessage, setSuccessMessage] = useState('')

  // إرسال البيانات إلى API باستخدام RTK Query
  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }).unwrap(); // استخدام unwrap لجلب البيانات الفعلية من الـ response

      setSuccessMessage('Registration successful!');
      reset(); 
      } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  return (
    <div className="py-8 flex flex-col items-center justify-center bg-fuchsia-50 bg-opacity-50 mb-12">
      <div className="text-center mt-12">
        <h1 className=" text-xl md:text-3xl font-bold text-teal-900 font-mono mb-4">Sign UP</h1>
      </div>
      <form className="w-full pl-20 md:pl-0 md:px-0  max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="name">Name</label>
          <input
            className="shadow appearance-none border rounded w-[80%]  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="email">Email</label>
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
          <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="password">Password</label>
          <input
            className="shadow appearance-none border rounded w-[80%]  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block font-normal text-gray-500 text-sm mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="shadow appearance-none border rounded w-[80%]  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
        </div>

        {/* إظهار رسائل الخطأ أو النجاح */}
        {error && <p className="text-red-500 text-center">{error.data.message || 'Registration failed.'}</p>}
        {isSuccess && <p className="text-green-500 text-center">{successMessage}</p>}

        <div className="flex items-center justify-center mr-12 md:mr-0 mt-12">
          <button
            className="bg-teal-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading} // تعطيل الزر أثناء تحميل البيانات
          >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
