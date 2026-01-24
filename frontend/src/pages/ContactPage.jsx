import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebookF, FaTwitter, FaInstagram, FaHeadset } from 'react-icons/fa';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', description: '' });
    }, 2000);
  };

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-4 border-bottom">
        <h1 className="fw-bold">Contact</h1>
        <p className="text-muted">How can we improve your experience?</p>
      </div>

      <div className="container-xxl px-lg-5 mt-4">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
              <div className="d-flex align-items-center justify-content-center mb-3" style={{ height: 140 }}>
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 110, height: 110, background: '#E7F5F2' }}>
                  <FaHeadset size={46} className="text-success" />
                </div>
              </div>
              <div className="small">
                <div className="mb-3">
                  <div className="fw-bold mb-1">Address</div>
                  <div className="d-flex align-items-center gap-2 text-muted"><FaMapMarkerAlt /> 5-roads,Salem-636330</div>
                </div>
                <div className="mb-3">
                  <div className="fw-bold mb-1">Phone</div>
                  <div className="d-flex align-items-center gap-2 text-muted"><FaPhoneAlt /> +91 990067 76893</div>
                </div>
                <div className="mb-3">
                  <div className="fw-bold mb-1">Email Address</div>
                  <div className="d-flex align-items-center gap-2 text-muted"><FaEnvelope /> demo@demo.com</div>
                </div>
                
                <div className="mt-4">
                  <div className="fw-bold mb-1">Follow Us</div>
                  <div className="d-flex align-items-center gap-2">
                    <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaFacebookF /></a>
                    <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaTwitter /></a>
                    <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaInstagram /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
              <h5 className="fw-bold mb-4">How can we improve your experience?</h5>
              <form onSubmit={onSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label small">Name</label>
                    <input className={`form-control rounded-pill ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={(e) => setField('name', e.target.value)} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Email</label>
                    <input className={`form-control rounded-pill ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={(e) => setField('email', e.target.value)} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label small">Subject</label>
                    <input className={`form-control rounded-pill ${errors.subject ? 'is-invalid' : ''}`} value={form.subject} onChange={(e) => setField('subject', e.target.value)} />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label small">Description</label>
                    <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} rows={5} value={form.description} onChange={(e) => setField('description', e.target.value)} />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-success rounded-pill px-4 py-2 fw-bold" type="submit">Submit</button>
                  {submitted && <span className="ms-3 text-success small">Thanks! We received your message.</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
