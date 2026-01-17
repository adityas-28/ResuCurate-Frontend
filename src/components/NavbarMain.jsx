// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function NavbarMain() {
//   const user = { name: "User " };
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     navigate("/");
//   };
//   return (
//     <>
//       <div className="bg-cyan-950 border-b border-b-cyan-500 shadow-xl rounded-3xl p-1">
//         <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
//           <Link to="/app" className="hover:opacity-80 transition-opacity">
//             <img
//               src="/logo.png"
//               alt="logo"
//               className="h-12 w-12 object-contain"
//             />
//           </Link>
//           <div className="hidden gap-6 md:flex text-white">
//             {[
//               { label: "Dashboard", onClick: () => navigate("/") },
//               { label: "Generate", onClick: () => navigate("/builder") },
//               { label: "ATS Scan", onClick: () => navigate("/ats-scan") },
//               { label: "My Resumes", onClick: () => navigate("/my-resumes") },
//             ].map(({ label, onClick }) => (
//               <button
//                 key={label}
//                 onClick={onClick}
//                 className="group relative overflow-hidden text-left"
//               >
//                 <span className="block transition-transform duration-300 group-hover:-translate-y-full text-sm hover:text-indigo-400">
//                   {label}
//                 </span>
//                 <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
//                   {label}
//                 </span>
//               </button>
//             ))}
//           </div>
//           <div className="flex items-center gap-6 text-sm">
//             <p className="max-sm:hidden text-gray-300 font-medium">
//               Hi, <span className="text-white">{user?.name}</span>
//             </p>
//             <button
//               onClick={logoutUser}
//               className="rounded-full border bg-slate-700 border- bg-slate-200 px-5 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:border-slate-300 hover:shadow-lg hover:shadow-gray-900/50 active:scale-95"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

// export default NavbarMain;


import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, User, Mail, Briefcase, MapPin, Camera } from "lucide-react";

const NavTab = ({ label, onClick, setPosition, isActive }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200
        ${
          isActive 
            ? "text-white font-semibold hover:text-black" 
            : "text-gray-300 hover:text-black"
        }`}
    >
      {label}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-9 rounded-full bg-cyan-50 text-black shadow-lg shadow-indigo-500/50"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        opacity: position.opacity,
      }}
    />
  );
};

function NavbarMain() {
  const [user, setUser] = useState({ 
    name: "User",
    email: "user@resucurate.com",
    role: "Premium Member",
    location: "Global",
    profileImage: null
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const logoutUser = () => {
    navigate("/");
  };

  const handleEditClick = () => {
    setEditForm(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditForm({ ...editForm, profileImage: imageUrl });
    }
  };

  const tabs = [
    { label: "Dashboard", path: "/app/dashboard" },
    { label: "Generate", path: "/app/generate" },
    { label: "ATS Scan", path: "/app/ats-scan" },
    { label: "My Resumes", path: "/app/my-resumes" },
    { label: "View Arsenal", path: "/app/view-arsenal" },
  ];

  return (
    <>
      <div className="bg-gray-950 rounded-3xl backdrop-blur-sm relative z-40">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
          
          {/* Logo */}
          <Link 
            to="/app"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/logo.png"
              alt="logo"
              className="h-12 w-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
            />
          </Link>

          {/* Sliding Tabs */}
          <ul
            onMouseLeave={() =>
              setPosition((pv) => ({ ...pv, opacity: 0 }))
            }
            className="relative hidden md:flex w-fit rounded-full bg-black/80 backdrop-blur-md p-1.5 border border-slate-600/50 shadow-inner"
          >
            {tabs.map((tab) => (
              <NavTab
                key={tab.path}
                label={tab.label}
                isActive={location.pathname === tab.path}
                onClick={() => navigate(tab.path)}
                setPosition={setPosition}
              />
            ))}

            <Cursor position={position} />
          </ul>

          {/* User Section */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <button 
              onClick={() => setShowProfileModal(true)}
              className="hidden sm:flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50 group-hover:border-indigo-400 transition-colors overflow-hidden">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                )}
              </div>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                Hi, <span className="text-white font-semibold group-hover:text-indigo-400 transition-colors">{user.name}</span>
              </p>
            </button>
            <button
              onClick={logoutUser}
              className="group relative rounded-full bg-gradient-to-r from-slate-700 to-slate-600 px-5 py-1.5 text-white font-medium transition-all duration-300 hover:from-slate-900 hover:to-slate-800 hover:shadow-lg hover:shadow-slate-500/20 active:scale-95 border border-slate-600/50 hover:border-slate-500/50"
            >
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
          </div>
        </nav>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowProfileModal(false);
                setIsEditing(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header Design */}
              <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setIsEditing(false);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Content */}
              <div className="px-6 pb-8">
                <div className="relative -mt-16 mb-6 flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center shadow-xl overflow-hidden">
                      {(isEditing ? editForm.profileImage : user.profileImage) ? (
                        <img src={isEditing ? editForm.profileImage : user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-indigo-400" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                  
                  {isEditing ? (
                     <div className="mt-4 w-full space-y-3">
                       <input
                         type="text"
                         value={editForm.name}
                         onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                         className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-center font-bold text-xl focus:border-indigo-500 outline-none"
                         placeholder="Name"
                       />
                       <input
                         type="text"
                         value={editForm.role}
                         onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                         className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-indigo-400 text-center font-medium focus:border-indigo-500 outline-none"
                         placeholder="Role"
                       />
                     </div>
                  ) : (
                    <>
                      <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
                      <p className="text-indigo-400 font-medium">{user.role}</p>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/30 transition-colors group">
                    <div className="p-2 rounded-lg bg-gray-800 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                      {isEditing ? (
                         <input
                           type="email"
                           value={editForm.email}
                           onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                           className="w-full bg-transparent border-b border-gray-600 focus:border-indigo-500 outline-none text-gray-200 py-0.5"
                         />
                      ) : (
                        <p className="text-gray-200">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/30 transition-colors group">
                    <div className="p-2 rounded-lg bg-gray-800 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                     <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Location</p>
                      {isEditing ? (
                         <input
                           type="text"
                           value={editForm.location}
                           onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                           className="w-full bg-transparent border-b border-gray-600 focus:border-indigo-500 outline-none text-gray-200 py-0.5"
                         />
                      ) : (
                        <p className="text-gray-200">{user.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/30 transition-colors group">
                    <div className="p-2 rounded-lg bg-gray-800 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                      <Briefcase className="w-5 h-5" />
                    </div>
                     <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Role</p>
                       {isEditing ? (
                         <input
                           type="text"
                           value={editForm.role}
                           onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                           className="w-full bg-transparent border-b border-gray-600 focus:border-indigo-500 outline-none text-gray-200 py-0.5"
                         />
                      ) : (
                        <p className="text-gray-200">{user.role}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleCancel}
                        className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="flex-1 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 shadow-lg shadow-green-500/25 transition-colors"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setShowProfileModal(false)} 
                        className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
                      >
                        Close
                      </button>
                      <button 
                         onClick={handleEditClick}
                         className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-colors"
                      >
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarMain;
