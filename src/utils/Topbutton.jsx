import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faArrowUp);

export default function Topbutton() {
  return (
    <button className="w-[50px] h-[50px] bg-orange-500  rounded-full text-white hover:bg-orange-400 bottom-5  right-5 fixed ">
      <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
    </button>
  );
}
