import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

const ContactsList = () => {
  const [allContacts, setAllContacts] = useState();

  useEffect(() => {
    try {
      const getContacts = async () => {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
      };
      console.log(data, "users");
      getContacts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl "
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar ">
       <div>
        
       </div>
        <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow ">
          <div>
            <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search or Start a new chat"
              className="bg-transparent text-sm focus:outline-none text-white w-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
