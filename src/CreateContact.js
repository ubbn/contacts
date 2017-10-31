import React from 'react';
import ImageInput from './ImageInput'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

export default class CreateContact extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    let values = serializeForm(e.target, { hash: true })
    // console.log(values)

    if (this.props.onCreateContact)
      this.props.onCreateContact(values)
  }

  render(){
    return (
      <div>
        <Link to='/' className='close-create-contact'>Back</Link>
        <form className='create-contact-form' onSubmit={this.handleSubmit}>
          <ImageInput 
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={124}
          />
          <div className='create-contact-details'>
            <input type="text" name='name' placeholder='Name'/>
            <input type="text" name='email' placeholder='Email'/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}