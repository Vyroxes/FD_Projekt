import React from 'react';

const Contact = ({ handleFormSubmit }) => 
{
    return (
        <div className="contact">
            <h1>Formularz kontaktowy</h1>
            <div className="contact-form">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (handleFormSubmit) 
                        {
                            handleFormSubmit({
                                username: e.target.username.value,
                                email: e.target.email.value,
                                subject: e.target.subject.value,
                                message: e.target.message.value,
                            });
                        }
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="username">Nazwa lub imię i nazwisko użytkownika:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email użytkownika do odpowiedzi:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Temat wiadomości:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Treść wiadomości:</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                        />
                    </div>

                    <div className="contact-actions">
                        <button type="submit">Wyślij wiadomość</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;