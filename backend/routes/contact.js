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

    // Send email
    const result = await sendContactFormEmail({
      name,
      email,
      subject,
      message,
    });

    if (result.success) {
      res.json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.',
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing contact form',
    });
  }
});

export default router;
