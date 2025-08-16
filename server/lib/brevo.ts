import axios from 'axios';
import { getEmailImages, createEmailTemplate } from './emailImages';

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY environment variable must be set");
}

// Brevo API configuration
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY!;

export interface EmailSubmissionParams {
  name: string;
  recipient_name: string;
  email: string;
  phone: string;
  type_of_message: string;
  message_details: string;
  feelings: string;
  story: string;
  specific_details: string;
  delivery_type: string;
  submission_id: string;
}

export interface EmailReplyParams {
  client_name: string;
  reply_message: string;
  admin_name: string;
  reply_link?: string;
  from_email: string;
  admin_panel_link?: string;
}

export async function sendSubmissionEmail(params: EmailSubmissionParams): Promise<boolean> {
  try {
    console.log('Starting sendSubmissionEmail with params:', JSON.stringify(params, null, 2));
    
    // Get email images
    const images = getEmailImages();
    
    // Format the current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create admin email content with table structure
    const adminContent = `
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Name</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">${params.name}</td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">Recipient's Name</td>
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">${params.recipient_name}</td>
      </tr>
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Date</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">${currentDate}</td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">Status</td>
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">New Submission</td>
      </tr>
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Email Address</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;"><a href="mailto:${params.email}" style="color:#ff6b6b;text-decoration:none;">${params.email}</a></td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">Phone Number</td>
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">${params.phone}</td>
      </tr>
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Type of Message</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">${params.type_of_message}</td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">Message Details</td>
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">${params.message_details}</td>
      </tr>
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Feelings</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">${params.feelings}</td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">Story</td>
        <td style="padding:10px;border-bottom:1px solid #ffe6cc;">${params.story}</td>
      </tr>
      <tr style="background:#fff5f5;">
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">Specific Details</td>
        <td style="padding:10px;border-bottom:1px solid #ffd6d6;">${params.specific_details || 'None provided'}</td>
      </tr>
      <tr style="background:#fffaf2;">
        <td style="padding:10px;">Delivery Type</td>
        <td style="padding:10px;">${params.delivery_type}</td>
      </tr>
    `;

    // Create user confirmation content
    const userContent = `
      <div style="padding: 20px; text-align: center;">
        <h3 style="color: #ff6b6b; margin-top: 0; font-size: 18px;">Dear ${params.name},</h3>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Thank you for submitting your heartfelt <strong>${params.type_of_message}</strong> for <strong>${params.recipient_name}</strong>.
        </p>
        
        <div style="background: #fff5f7; border: 1px solid #f9ccd3; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: left;">
          <h4 style="margin-top: 0; color: #ff6b6b;">Your Submission Details:</h4>
          <p style="margin: 5px 0;"><strong>Message Type:</strong> ${params.type_of_message}</p>
          <p style="margin: 5px 0;"><strong>Delivery Type:</strong> ${params.delivery_type}</p>
          <p style="margin: 5px 0;"><strong>Submission Date:</strong> ${currentDate}</p>
          <p style="margin: 5px 0;"><strong>Reference ID:</strong> ${params.submission_id}</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Our team will begin crafting your personalized message with care and attention. We'll be in touch soon with updates!
        </p>
        
        <p style="font-size: 16px; margin-top: 30px; color: #ff6b6b;">
          With warm regards,<br><strong>The Written Hug Team</strong>
        </p>
      </div>
    `;

    // Get templates with images
    const adminTemplate = createEmailTemplate('admin', images);
    const userTemplate = createEmailTemplate('user', images);
    
    const adminHtmlContent = adminTemplate.replace('{NAME}', params.name).replace('{CONTENT}', adminContent);
    const userHtmlContent = userTemplate.replace('{NAME}', params.name).replace('{CONTENT}', userContent);

    // Create email objects with explicit structure
    const adminEmail = {
      "sender": {
        "email": "thewrittenhug@gmail.com",
        "name": "The Written Hug System"
      },
      "to": [{
        "email": "thewrittenhug@gmail.com", 
        "name": "The Written Hug Admin"
      }],
      "subject": `We got a Kabootar from ${params.name}`,
      "htmlContent": adminHtmlContent
    };

    const userEmail = {
      "sender": {
        "email": "thewrittenhug@gmail.com",
        "name": "The Written Hug Team"
      },
      "to": [{
        "email": params.email,
        "name": params.name
      }],
      "subject": "CEO - The Written Hug",
      "htmlContent": userHtmlContent
    };

    console.log('Prepared admin email object:', JSON.stringify(adminEmail, null, 2));
    console.log('Prepared user email object:', JSON.stringify(userEmail, null, 2));

    // Send admin email
    const adminResponse = await axios.post('https://api.brevo.com/v3/smtp/email', adminEmail, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Admin email response:', adminResponse.status, adminResponse.data);

    // Send user email
    const userResponse = await axios.post('https://api.brevo.com/v3/smtp/email', userEmail, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('User email response:', userResponse.status, userResponse.data);
    
    return adminResponse.status === 201 && userResponse.status === 201;
  } catch (error) {
    console.error('Email sending failed:', error);
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      console.error('Response status:', axiosError.response?.status);
      console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
    }
    return false;
  }
}

export async function sendReplyEmail(clientEmail: string, params: EmailReplyParams): Promise<boolean> {
  try {
    // Get email images
    const images = getEmailImages();
    
    // Create reply content matching the template design
    const replyContent = `
      <p style="margin:0 0 14px;font-size:15px;">
        Hi ${params.client_name},
      </p>

      <div style="background:#fff5f7;border-radius:8px;padding:16px 18px;border:1px solid #f9ccd3;">
        <p style="margin:0;font-size:15px;line-height:1.6;text-align:justify;color:#2f2f2f;">
          ${params.reply_message.replace(/\n/g, '<br>')}
        </p>
      </div>

      <p style="margin:12px 0 0;font-size:15px;">
        To continue, simply reply to this email and we'll get back to you.
      </p>

      <p style="margin:12px 0 0;font-size:13px;color:#666;">
        This message is a direct reply to the message you sent — no marketing, no promotions.
      </p>
    `;

    // Get template with images
    const replyTemplate = createEmailTemplate('reply', images);
    const replyHtmlContent = replyTemplate.replace('{CONTENT}', replyContent);

    // Send reply email using direct HTML
    const replyEmailData = {
      sender: {
        email: 'thewrittenhug@gmail.com',
        name: 'The Written Hug Team'
      },
      to: [
        {
          email: clientEmail,
          name: params.client_name
        }
      ],
      subject: `CEO - The Written Hug`,
      htmlContent: replyHtmlContent,
      replyTo: {
        email: 'thewrittenhug@gmail.com',
        name: 'The Written Hug Team'
      }
    };

    console.log('Reply email data:', JSON.stringify(replyEmailData, null, 2));
    
    const replyResult = await axios.post(BREVO_API_URL, replyEmailData, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Reply email result:', replyResult.status);
    console.log('Reply email response:', JSON.stringify(replyResult.data, null, 2));
    
    return true;
  } catch (error) {
    console.error('Brevo reply email error:', error);
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      console.error('Response status:', axiosError.response?.status);
      console.error('Response data:', axiosError.response?.data);
    }
    return false;
  }
}