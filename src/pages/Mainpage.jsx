import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../auth/auth'; 
import { Link } from 'react-router-dom';
const Mainpage = () => {
  const [posts, setPosts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  // جلب البيانات من ملف JSON
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
      .then(response => response.json())
      .then(data => {
        // الوصول إلى طلب get posts
        const getPostsRequest = data.item.find(item => item.name === 'posts').item.find(subItem => subItem.name === 'get posts')
        const postsResponse = getPostsRequest.response[0].body

        const parsedPosts = JSON.parse(postsResponse).data
        console.log('Parsed Posts:', parsedPosts)
        setPosts(parsedPosts)
      })
      .catch(error => {
        console.error('Error fetching posts:', error)
      })
  }, [])

  // حذف المنشور
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId))
      } else {
        console.error('Failed to delete post:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  };

  // التعامل مع التعديل: الانتقال إلى صفحة التعديل
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`)
  };

  // حساب الترقيم
  const endOffset = itemOffset + itemsPerPage
  const currentItems = posts.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(posts.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length
    setItemOffset(newOffset)
  };

  return (
    <div className="container mx-auto py-10">
      <Link to='/login'><button className='border border-solid mr-8'>Login/Register</button></Link>
      <Link to='/update'><button className='border border-solid'>Add/Update</button></Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-800">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems?.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-bold text-teal-700 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            {post.image && <img src={post.image} alt={post.title} className="mb-4" />}

            {/* عرض أزرار التعديل والحذف بناءً على دور المستخدم */}
            {currentUser && (
              <div className="flex justify-end space-x-2">
                {/* المستخدمون الموثقون يمكنهم تعديل أو حذف منشوراتهم الخاصة، المسؤولون يمكنهم حذف أي منشور */}
                {(currentUser.role === 'admin' || (currentUser.role === 'user' && post.userId === currentUser.id)) && (
                  <>
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {currentItems.length > 5 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<previous"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center mb-2 text-sm gap-5"
          pageLinkClassName="py-2 px-2 cursor-pointer border-solid  hover:bg-slate-600 hover:text-white "
          previousLinkClassName="py-2 px-4 text[4px] md:text-sm cursor-pointer border-solid  hover:bg-slate-600 hover:text-white"
          nextLinkClassName="py-2 px-2 text[4px] md:text-sm cursor-pointer border-solid  hover:bg-slate-600 hover:text-white"
          activeLinkClassName="active"
        />
      )}
    </div>
  );
};

export default Mainpage;
