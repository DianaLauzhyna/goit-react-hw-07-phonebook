import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import ContactsList from './ContactsList/ContactsList';

import {Section, SectionHeader} from './UI/Section/Section';
import InputSearch from './UI/InputSearch/InputSearch';
import { Loader } from './UI/Loader/Loader';

import { getContacts, getFilter } from 'redux/selectors';
import {
  fetchTasks,
  deleteContact,
  addContact,
  findByName,
} from 'redux/contactsThunk';



import { Wrapper, InputSearchStyle } from './App.styled';

export const App = () => {
  const { items: contacts, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onInputContact = user => {
    if (contacts.some(contact => contact.name === user.name)) {
      return alert(`${user.name} is already in contacts.`);
    }
    dispatch(addContact(user));
  };

  const findByNameFilter = value => {
    const name = value.trim().toLocaleLowerCase();
    dispatch(findByName(name));
  };
  const onClickDelete = id => {
    dispatch(deleteContact(id));
  };
  return (
    <Wrapper>
      <Section title="PhoneBook">
        <PhoneBookForm onInputContact={onInputContact} />
      </Section>

      <SectionHeader title="Contacts"/>
        <InputSearch
          nameSearch="Find contacts by name"
          onSearchName={findByNameFilter}
        />
        <InputSearchStyle>
          {isLoading && <Loader />}
        </InputSearchStyle>
        <p>{error}</p>
        <ContactsList
          onClickDelete={onClickDelete}
          contacts={filter === '' ? contacts : filter}
        />
    </Wrapper>
  );
};
