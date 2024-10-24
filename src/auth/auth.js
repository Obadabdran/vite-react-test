
export const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // حفظ الرمز (token) ومعلومات المستخدم في LocalStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user; // إعادة معلومات المستخدم
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  
  // وظيفة لجلب معلومات المستخدم الحالي من LocalStorage
  export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // وظيفة لتسجيل الخروج
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  