import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import user_image from "@/public/images/user_image.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function UserDrop() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  // Check if the user is signed in
  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");

    // If user data exists in localStorage, parse it into a JavaScript object
    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
      console.log(parsedUser);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: "Token " + token } : {};

    try {
      await axios.post("http://localhost:8000/api/logout/", {}, { headers });
      localStorage.removeItem("token"); // Remove the token from local storage
      localStorage.removeItem("user"); // Remove the user data from local storage
      router.push("/signin"); // Optionally, redirect the user to the home page or sign-in page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-8 h-8 me-2 rounded-full"
          src={user_image} // Assuming user object has an avatar field
          alt="user photo"
        />
        <span style={{color:"#0070F4"}}>
          {user ? user.name : "name"} {/* Display the user's name */}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
          style={{color:"#0070F4"}}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownAvatarName"
          style={{right:"-20%"}}
          className="absolute  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium">Pro User</div>
            <div className="truncate">{user ? user.email : "email"}</div>{" "}
            {/* Display the user's email */}
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownAvatarNameButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                History
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
