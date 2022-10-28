import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import ContactsList from './ContactsList/ContactsList';
import {Section, SectionHeader} from './Section/Section';
import InputSearch from './InputSearch/InputSearch';
import { getContacts, getFilter } from 'redux/selectors';
import { Wrapper } from './App.styled';
import {
  fetchTasks,
  deleteContact,
  addContact,
  findByName,
} from 'redux/operation';
import { Loader } from './Loader/Loader';
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
        <div
          style={{
            width: 'fit-content',
            margin: ' 0 auto',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          {isLoading && <Loader />}
        </div>
        <p>{error}</p>
        <ContactsList
          onClickDelete={onClickDelete}
          contacts={filter === '' ? contacts : filter}
        />
    </Wrapper>
  );
};
