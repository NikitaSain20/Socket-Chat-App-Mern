// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();
//   // console.log("authuserdsd",authUser)
//   return (
//     <header
//       className="bg-base-100 border-b border-base-300 w-full top-0 z-40
//     backdrop-blur-lg fixed "
//     >
//       <div className="container mx-auto px-5 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link
//               to="/"
//               className="flex items-center gap-8 hover:opacity-80 transition-all"
//             >
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold uppercase">Chatterly</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-8">
//             {/* <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors
//               `}
//             >
//               <Settings className="w-4 h-4" />
//               <span className="hidden sm:inline">Settings</span>
//             </Link> */}

//             {authUser && (
//               <>
//                 {/* <Link to={"/profile"} className={`btn btn-sm gap-2`}> */}
//                 <Link
//                   to={"/profile"}
//                   className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-medium text-lg "
//                 >
//                   {authUser.profilePic ? (
//                     <img
//                       src={authUser.profilePic}
//                       alt={authUser.fullName}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     authUser.fullName?.charAt(0).toUpperCase()
//                   )}
//                 </Link>
//                 {/* <img src={authUser.profilePic} className="size-7" />
//                   {authUser.fullName} */}
//                 {/* </Link> */}

//                 <button
//                   className="flex gap-2 items-center bg-black-100"
//                   onClick={logout}
//                 >
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline text-xs font-medium">
//                     Logout
//                   </span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-40 bg-white b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 
            flex items-center justify-center shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-wide text-base-content">
            Chatter<span className="text-primary">ly</span>
          </span>
        </Link>

        {/* Right side */}
        {authUser && (
          <div className="flex items-center gap-2">
            {/* Settings */}
            <Link
              to="/settings"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                ${
                  location.pathname === "/settings"
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/50 hover:bg-base-200 hover:text-base-content"
                }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors
                ${
                  location.pathname === "/profile"
                    ? "bg-primary/10"
                    : "hover:bg-base-200"
                }`}
              title="Profile"
            >
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 
                ring-2 ring-primary/20"
              >
                {authUser.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-primary to-blue-500 
                    flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {authUser.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium text-base-content/80 max-w-[100px] truncate">
                {authUser.fullName}
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-base-300 mx-1" />

            {/* Logout */}
            <button
              onClick={logout}
              title="Logout"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                text-base-content/50 hover:bg-red-500/10 hover:text-red-500 
                transition-colors group"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline text-xs font-medium">
                Logout
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
