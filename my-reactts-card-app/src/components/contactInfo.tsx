import * as React from "react";
import { useState } from "react";
import { FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";
import Contact from "../model/Contact";
import Image from "../model/Image";
import { useAppDispatch } from "../app/hooks";
import classNames from "classnames";

interface ContactProps {
  contact?: Contact;
  image?: Image;
  isDisabled?: boolean;
  isSelected?: boolean;
  onContactUpdate: (id: string) => void;
  onContactSelect: (id: string) => void;
  onContactDisable: (id: string) => void;
}

const ContactInfo: React.FC<ContactProps> = (props) => {
  const dispatch = useAppDispatch();
  const contact = props.contact;
  let [isDisabled, setIsDisabled] = useState(props.isDisabled);

  // const isDisabled = props.isDisabled;

  const setUpdatePage = (id: string) => {
    props.onContactUpdate(id);
  };

  const selectCard = (id: string) => {
    if (!isDisabled) {
      props.onContactSelect(id);
    }
  };

  const disableCard = (id: string) => {
    props.onContactDisable(id);
    setIsDisabled((current) => !current);
  };

  return (
    <button
      // disabled={props.isDisabled}
      className={classNames(
        "items-center justify-center",
        `${isDisabled ? "opacity-30" : "opacity-100"}`,
      )}
      disabled={isDisabled}
    >
      <div className="flex flex-col overflow-auto">
        <div
          className={classNames(
            "card relative flex flex-col items-center justify-center mt-3 bg-white cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          )}
          draggable="true"
        >
          <button
            className="absolute top-0 left-0 items-center justify-center mt-3 ml-2 text-gray-500 rounded hover:text-gray-700 group-hover:flex"
            onClick={() => setUpdatePage(contact?.id)}
            disabled={isDisabled}
          >
            <FaEdit />
          </button>
          <button
            className={classNames(
              "absolute top-0 right-0  items-center justify-center mt-3 mr-2 text-gray-500 rounded hover:text-gray-700 group-hover:flex",
              `${isDisabled ? "invisible" : "visible"}`
            )}
            onClick={() => disableCard(contact?.id)}
            disabled={props.isSelected}
          >
            <FaToggleOn />
          </button>
          <button
            className={classNames(
              "absolute top-0 right-0  items-center justify-center mt-3 mr-2 text-gray-500 rounded hover:text-gray-700 group-hover:flex",
              `${isDisabled ? "visible" : "invisible"}`
            )}
            onClick={() => disableCard(contact?.id)}
            disabled={props.isSelected}
          >
            <FaToggleOff />
          </button>

          <div
            className="flex flex-col items-center justify-center mt-2"
            onClick={() => selectCard(contact?.id)}
          >
            {props.image ? (
              <img
                className={classNames("pic rounded-full", ``)}
                src={`${props.image ? props.image.download_url : ""}`}
                alt=""
              ></img>
            ) : (
              <svg
                role="status"
                className={classNames(
                  "inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600"
                )}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            )}
            <div className="name flex items-center mt-3">
              <span>{contact?.name}</span>
            </div>

            <div className="info flex items-center mt-1">
              <span>{contact?.phone.split(" ")[0]}</span>
            </div>
            <div className="info flex items-center mt-1">
              <span>{contact?.email}</span>
            </div>
            <div
              className="w-44 mt-3"
              style={{ borderTop: "1px solid #000 " }}
            ></div>

            <div className="info flex items-center mt-3">
              <span>{contact?.company?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ContactInfo;
