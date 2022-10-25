import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import Contact from "../model/Contact";
import { contactList } from "./contactList";

type initialStateType = {
  contactList: Contact[];
};

export const getContacts: any = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const contactList: [] = await response.json();
      console.log(contactList);

    return contactList;
  }
);


const initialState: initialStateType = {
  contactList,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      
      state.contactList.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const {
        payload: { id, name, email, phone },
      } = action;

      state.contactList = state.contactList.map((contact) =>
        contact.id === id ? { ...contact, name, email, phone } : contact
      );
    },
    removeContact: (state, action: PayloadAction<{ id: string }>) => {
      state.contactList = state.contactList.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [getContacts.pending]: (state: any, action: any) => {
      console.log('fetching ...');
      state.status = 'fetching...';
    },
    [getContacts.fulfilled]: (state: any, action: any) => {
      console.log('fetched  successfully');
      state.contact = action.payload.contact;
    },
    [getContacts.rejected]: (state: any, action: any) => {
      console.log('error fetching ');
      state.status = 'error fetching ';
    },}
});

export const { addContact, updateContact, removeContact } =
  contactSlice.actions;
export const getContactList = (state: RootState) => state.contact.contactList;

export default contactSlice.reducer;
