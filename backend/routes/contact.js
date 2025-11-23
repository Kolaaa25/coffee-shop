import express from 'express';
import { sendContactFormEmail } from '../utils/email.js';

const router = express.Router();

// Send contact form message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Send response immediately
    res.json({
      success: true,
      message: 'Message received! We\'ll get back to you soon.',
    });

    // Send email asynchronously (don't wait for it)
    sendContactFormEmail({
      name,
      email,
      subject,
      message,
    }).then(() => {
      console.log('✅ Contact form email sent');
    }).catch((error) => {
      console.error('❌ Contact form email error:', error.message);
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing contact form',
    });
  }
});

export default router;
