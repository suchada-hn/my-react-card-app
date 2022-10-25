import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import Contact from "../model/Contact";

import ContactList from "../components/contactList";

const HomePage: React.FC = (props) => {
  let [open, setOpen] = useState(false);
  let [isSelected, setIsSelected] = useState(false);
  const getContactList = useAppSelector((state) => state.contact.contactList);

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-green-200">

      <ContactList contacts={getContactList} />
     
    </div>
  );
};

export default HomePage;
