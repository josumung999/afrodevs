import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

	return (
		<Fragment>
			<h1 className="large text-primary">
       Ajouter une formation
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Ajoute n'importe quelle étude ou Bootcamp
          auquel vous avez participé
      </p>
      <small>* = Champs Obligatoires</small>
      <form className="form" onSubmit={e => {
      	e.preventDefault();
      	addEducation(formData, history);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Université Ou Bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Diplôme ou Certificat" name="degree" value={degree} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Sujet étudié" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>Date de debut</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
          	setFormData({ ...formData, current: !current });
          	toggleDisabled(!toDateDisabled);
          }} /> {' '}J'y suis actuellement</p>
        </div>
        <div className="form-group">
          <h4>Date de fin</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} 
          	disabled={toDateDisabled ? 'disabled': ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Parlez-nous brievement de ce programme d'étude"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
      </form>
		</Fragment>
	)
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation);