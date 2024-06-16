import { useEffect, useState } from "react";

const NotificationPopUp = ({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Notification will fade out after 3 seconds
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-10 right-10 bg-blue-500 text-white px-4 py-2 rounded transition-opacity duration-300 ease-in-out ${
        !show && "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default NotificationPopUp;
