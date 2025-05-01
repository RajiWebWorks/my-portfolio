// Defines the structure for the contact form data

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// You might also define the structure of a Contact object if you store/retrieve them
// export interface Contact extends ContactFormData {
//   id: string | number;
//   submittedAt: Date;
//   read?: boolean;
// } 