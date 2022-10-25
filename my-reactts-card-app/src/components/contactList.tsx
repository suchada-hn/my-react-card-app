import { useState, useEffect } from "react";
import ContactInfo from "../components/contactInfo";
import Contact from "../model/Contact";
import Image from "../model/Image";
import NewContact from "./NewContact";
import DialogBox from "./DialogBox";
import SelectedCard from "../components/selectedCard";
import { useAppSelector } from "../app/hooks";

interface ContactProps {
  contacts: Contact[] | undefined;
}
const ContactList: React.FC<ContactProps> = ({ contacts }) => {
  let [open, setOpen] = useState(false);
  let [isSelected, setIsSelected] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  let [id, setID] = useState("");

  const [err, setErr] = useState<string>("");
  const [data, setData] = useState<Image[]>([]);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        console.log("set rests");
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
        setErr(error);
      });

    console.log(err);
    console.log("done");
  }, []);

  const ContactUpdate = (id: string) => {
    setID(id);
    setOpen(true);
  };

  const ContactSelect = (id: string) => {
    setID(id);
    setIsSelected(true);
  };

  const ContactDisable = (id: string) => {
    setID(id);
    // setIsDisabled(true);
    if (isSelected) {
      setIsDisabled((current) => current);
    } else {
      setIsDisabled((current) => !current);
    }
  };

  const SelectedCardHandle = () => {
    setIsSelected((current) => !current);
  };
  const DialogHandle = () => {
    setOpen((current) => !current);
  };
  const contactData = useAppSelector((state) =>
    state.contact.contactList.find((contact) => contact.id === id)
  );
  return (
    <div className="flex flex-col items-center justify-center mx-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contacts &&
          contacts.map((contact, idx) => (
            <ContactInfo
              key={contact.id}
              contact={contact}
              image={data[Number(contact.id)]}
              isDisabled={isDisabled}
              isSelected={isSelected}
              onContactUpdate={ContactUpdate}
              onContactSelect={ContactSelect}
              onContactDisable={ContactDisable}
            />
          ))}

        {isSelected && (
          <SelectedCard open={isSelected} OnDialogHandle={SelectedCardHandle}>
            <ContactInfo
              key={id}
              contact={contactData}
              image={data[Number(id)]}
              isDisabled={isDisabled}
              isSelected={isSelected}
              onContactUpdate={ContactUpdate}
              onContactSelect={ContactSelect}
              onContactDisable={ContactDisable}
            />
          </SelectedCard>
        )}
        {open && (
          <DialogBox open={open} OnDialogHandle={DialogHandle}>
            <NewContact id={id} />
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default ContactList;
