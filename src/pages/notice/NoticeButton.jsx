import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Notice from './Notice';

// export default function Notice() {
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     try {
//       await apiClient.get('/api/auth/check');
//       navigate('/user/notice');
//     } catch (error) {
//       console.log(error);
//     }
//   };

// 비어있는 아이콘 쓰는 법
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-regular-svg-icons';

// function MyComponent() {
//   return (
//     <div>
//       <FontAwesomeIcon icon={faBell} />
//       {/* ... other components ... */}
//     </div>
//   );
// }

export default function NoticeDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      //await apiClient.get('/api/auth/check');
      setIsOpen(!isOpen);
      // navigate('/user/notice');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center relative ">
      <button onClick={handleClick} className="focus:outline-none ">
        <FontAwesomeIcon
          icon={faBell}
          className="text-orange-500 text-2xl mr-5"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 mt-0 w-80 bg-white border-1 border-gray-200 rounded-lg shadow-lg z-10 h-90">
          <Notice />
        </div>
      )}
    </div>
  );
}
