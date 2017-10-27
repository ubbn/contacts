import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static prototypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => (
    this.setState({
      query: query.trim()
    })
  )

  clearQuery = () => {
    this.setState({
      query: ''
    })
  }

  render() {
    // Object destructuring, make props, state look clean
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    }
    else
      showingContacts = this.props.contacts

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input type="text"
            className='search-contacts'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>

        { !!query && (
          <div className='showing-contacts'>
            <span>
              Showing {showingContacts.length} of {contacts.length}
              <button onClick={this.clearQuery}>Show all</button>
            </span>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className='contact-remove' 
                onClick={() => onDeleteContact(contact)} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;