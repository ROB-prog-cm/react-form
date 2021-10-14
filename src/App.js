import React, {useEffect, useState} from 'react';
import "./App.css";


const App = () => {
  const initialValue = {username: '', email: '', password: ''}
  const [formValues, setFormValues] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = 'Заполните это поле'
    }
    if (!values.email) {
      errors.email = 'Заполните это поле'
    } else if (!regex.test(values.email)) {
      errors.email = 'Недопустимый формат email'
    }
    if (!values.password) {
      errors.password = 'Заполните это поле'
    } else if (values.password.length < 4) {
      errors.password = 'Недостаточно символов'
    } else if (values.password.length > 10) {
      errors.password = 'Максимальное количество символов 9'
    }
    return errors
  }

  return (
    <div className='container'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div>Sigged in</div>)
        : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )}
      <form onSubmit={handleSubmit}>
        <h1>Logon</h1>
        <div>
          <div className='field'>
            <label>Username</label>
            <input
              type="text"
              name='username'
              placeholder='Username'
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className='field'>
            <label>Email</label>
            <input
              onChange={handleChange}
              value={formValues.email}
              type="email"
              name='email'
              placeholder='email'/>
          </div>
          <p>{formErrors.email}</p>
          <div className='field'>
            <label>Password</label>
            <input
              onChange={handleChange}
              value={formValues.password}
              type="password"
              name='password'
              placeholder='Password'/>
          </div>
          <p>{formErrors.password}</p>
          <button className='fluid ui button blue'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;