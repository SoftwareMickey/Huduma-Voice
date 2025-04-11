const ContactSchema =  require('../../models/contacts/contact');

async function httpAddContact(req, res){

  try {
    const { fullName, email, phoneNumber, services, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !services.length) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    // Create a new contact entry
    const newContact = new ContactSchema({
      fullName : fullName,
      email : email,
      phoneNumber : phoneNumber,
      services : services,
      message : message,
    });

    await newContact.save(); // Save to database

    return res.status(201).json(
        { message: "Contact message saved successfully!", contact: newContact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function httpFetchContactMessages(req, res){
  
    try {
      // * Check if the user exists
      const contacts = await ContactSchema.find().sort({ createdAt: -1 });

      if (!contacts) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // * Respond with token and user info
      return res.status(200).json({
        message: 'Login successful',
        messages : contacts
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { httpAddContact, httpFetchContactMessages }