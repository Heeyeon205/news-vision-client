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

// 비어있는 아이콘 쓰는 법 방법 1
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

// 비어있는 아이콘 쓰는 법 방법 1
// <svg
//xmlns="http://www.w3.org/2000/svg"
//width="20"
//height="20"
//viewBox="0 0 24 24"
//fill="none"
//stroke="currentColor"
//stroke-width="2"
//stroke-linecap="round"
//stroke-linejoin="round"
//class="feather feather-bell"
//>
//<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
//<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//</svg>

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
