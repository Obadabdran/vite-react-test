import { useState } from 'react'
import { useForm } from 'react-hook-form'

const AddPost = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [imageError, setImageError] = useState('')

  // التحقق من صحة الصورة
  const validateImage = (file) => {
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setImageError('Only JPG or PNG images are allowed.')
      return false
    }
    if (file && file.size > 1.5 * 1024 * 1024) {
      setImageError('Image size must not exceed 1.5 MB.')
      return false
    }
    setImageError('')
    return true;
  };

  const onSubmitForm = async (data) => {
    // التحقق من وجود صورة
    const file = data.image && data.image.length > 0 ? data.image[0] : null
    if (file && !validateImage(file)) return // تحقق من صحة الصورة

    // إنشاء FormData لإرسال البيانات عبر POST
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (file) {
      formData.append('image', file)// إضافة الصورة إذا كانت موجودة
    }

    // إرسال البيانات إلى API الخاص بإضافة المنشور
    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newPost = await response.json()
        console.log('Post added successfully:', newPost)
        reset(); // تفريغ النموذج بعد الإرسال
      } else {
        console.error('Failed to add post:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding post:', error)
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl mb-6 text-center">Add New Post</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block font-bold mb-2">Title</label>
          <input
            className="border border-gray-300 p-2 w-full"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block font-bold mb-2">Description</label>
          <textarea
            className="border border-gray-300 p-2 w-full"
            {...register('description', { required: 'Description is required' })}
            placeholder="Enter post description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Image (optional)</label>
          <input
            type="file"
            className="border border-gray-300 p-2 w-full"
            {...register('image')}
            accept="image/jpeg, image/png"
          />
          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
