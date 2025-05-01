import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faArrowUp);

export default function Topbutton() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(35);

  const handleScroll = () => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    if (footerRect.top < windowHeight) {
      const overlap = windowHeight - footerRect.top;
      setBottomOffset(overlap + 20);
    } else {
      setBottomOffset(35);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="w-[40px] h-[40px] bg-orange-500 z-50 rounded-full text-white hover:bg-orange-400 right-5 xl:right-90 fixed"
      style={{ bottom: `${bottomOffset}px` }}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
