import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-14">
      <button
        className="w-full max-w-xl py-10 px-10 bg-indigo-600 hover:bg-indigo-700 uppercase text-white rounded-lg shadow-md text-3xl font-bold font-sans md:text-4xl md:py-14 md:px-14 flex items-center justify-center gap-4"
        onClick={() => navigate("/users/transactions/add")}
      >
        Add Transactions
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#e8eaed"
        >
          <path d="M220-80q-24.75 0-42.37-17.63Q160-115.25 160-140v-680q0-24.75 17.63-42.38Q195.25-880 220-880h520q24.75 0 42.38 17.62Q800-844.75 800-820v680q0 24.75-17.62 42.37Q764.75-80 740-80H220Zm0-60h520v-680H220v680Zm260-59q80.51 0 137.26-56.74Q674-312.49 674-393q0-80.51-56.74-137.26Q560.51-587 480-587q-80.51 0-137.26 56.74Q286-473.51 286-393q0 80.51 56.74 137.26Q399.49-199 480-199Zm0-84q-22.68 0-44.05-8-21.38-8-37.95-24l159-159q17 15 25 36.56 8 21.56 8 44.44 0 45.83-32.08 77.92Q525.83-283 480-283ZM304.18-708q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5Zm134 0q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5ZM220-140v-680 680Z" />
        </svg>
      </button>
      <button
        className="w-full max-w-xl py-10 px-10 bg-teal-500 hover:bg-teal-600 uppercase text-white rounded-lg shadow-md text-3xl font-bold font-sans md:text-4xl md:py-14 md:px-14 flex items-center justify-center gap-4"
        onClick={() => navigate("/users/transactions/status")}
      >
        Status
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#e8eaed"
        >
          <path d="M280-80v-249h-71q-36 0-62.5-24.5T120-414q0-27 13.5-50.5T172-499l281-120v-42q-37-10-60.5-40.5T369-770q0-46 33-78t79-32q46 0 79 32t33 78h-60q0-21-15.5-35.5T481-820q-21 0-36.5 14.5T429-770q0 23 15.5 38.5T483-716q12 0 21 8.5t9 20.5v68l275 120q25 11 38.5 34.5T840-414q0 36-26.5 60.5T751-329h-71v249H280Zm-71-309h71v-51h400v51h71q11 0 20-7.5t9-18.5q0-9-5-16t-13-11L483-568 198-442q-8 4-13 11t-5 15q0 11 8.5 19t20.5 8Zm131 249h280v-240H340v240Zm0-240h280-280Z" />
        </svg>
      </button>
      <button
        className="w-full max-w-xl py-10 px-10 bg-orange-600 hover:bg-orange-700 uppercase text-white rounded-lg shadow-md text-3xl font-bold font-sans md:text-4xl md:py-14 md:px-14 flex items-center justify-center gap-4"
        onClick={() => navigate("/users/members/add")}
      >
        Add Member
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#e8eaed"
        >
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
        </svg>
      </button>
    </div>
  );
};

export default UserDashboard;
