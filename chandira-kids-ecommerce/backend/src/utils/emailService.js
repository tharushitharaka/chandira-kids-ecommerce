// Email Service Configuration
// This file provides email sending functionality using SendGrid or Mailchimp
// Configure your preferred email service in the .env file

const emailService = {
  // SendGrid Configuration
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@chandirakids.com',
    fromName: process.env.SENDGRID_FROM_NAME || 'Chandira Kids'
  },

  // Mailchimp Configuration
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    listId: process.env.MAILCHIMP_LIST_ID,
    fromEmail: process.env.MAILCHIMP_FROM_EMAIL || 'noreply@chandirakids.com'
  },

  // Get active email service
  getActiveService() {
    if (process.env.SENDGRID_API_KEY) {
      return 'sendgrid';
    }
    if (process.env.MAILCHIMP_API_KEY) {
      return 'mailchimp';
    }
    return null;
  },

  // Send welcome email
  async sendWelcomeEmail(email, name = '') {
    const service = this.getActiveService();
    
    if (service === 'sendgrid') {
      // SendGrid implementation
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(this.sendGrid.apiKey);
        
        const msg = {
          to: email,
          from: {
            email: this.sendGrid.fromEmail,
            name: this.sendGrid.fromName
          },
          subject: 'Welcome to Chandira Kids!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #C43670;">Welcome to Chandira Kids!</h2>
              <p>Thank you for subscribing to our newsletter${name ? `, ${name}` : ''}!</p>
              <p>As a special welcome gift, here's your <strong>10% discount code</strong>: <span style="background: #C43670; color: white; padding: 5px 10px; border-radius: 3px;">WELCOME10</span></p>
              <p>Use this code on your next purchase to enjoy 10% off!</p>
              <p>Stay tuned for exclusive offers, new arrivals, and fashion tips for your little ones.</p>
              <br>
              <p>Best regards,<br>The Chandira Kids Team</p>
            </div>
          `
        };
        
        await sgMail.send(msg);
        return { success: true };
      } catch (error) {
        console.error('SendGrid error:', error);
        return { success: false, error: error.message };
      }
    } else if (service === 'mailchimp') {
      // Mailchimp implementation
      try {
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        mailchimp.setConfig({
          apiKey: this.mailchimp.apiKey,
          server: this.mailchimp.apiKey.split('-')[1]
        });

        await mailchimp.lists.addListMember(this.mailchimp.listId, {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0] || '',
            LNAME: name.split(' ').slice(1).join(' ') || ''
          }
        });

        return { success: true };
      } catch (error) {
        console.error('Mailchimp error:', error);
        return { success: false, error: error.message };
      }
    } else {
      console.warn('No email service configured. Email not sent.');
      return { success: false, error: 'No email service configured' };
    }
  },

  // Send campaign email
  async sendCampaignEmails(campaign, subscribers) {
    const service = this.getActiveService();
    
    if (!service) {
      console.warn('No email service configured. Campaign not sent.');
      return { success: false, error: 'No email service configured' };
    }

    if (service === 'sendgrid') {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(this.sendGrid.apiKey);

        const emails = subscribers.map(subscriber => ({
          to: subscriber.email,
          from: {
            email: this.sendGrid.fromEmail,
            name: this.sendGrid.fromName
          },
          subject: campaign.subject,
          html: campaign.content,
          customArgs: {
            campaign_id: campaign._id.toString(),
            subscriber_id: subscriber._id.toString()
          }
        }));

        // Send emails in batches
        const batchSize = 100;
        for (let i = 0; i < emails.length; i += batchSize) {
          const batch = emails.slice(i, i + batchSize);
          await Promise.all(batch.map(email => sgMail.send(email)));
        }

        return { success: true, sent: emails.length };
      } catch (error) {
        console.error('SendGrid campaign error:', error);
        return { success: false, error: error.message };
      }
    } else if (service === 'mailchimp') {
      // Mailchimp campaign implementation
      try {
        const mailchimp = require('@mailchimp/mailchimp_marketing');
        mailchimp.setConfig({
          apiKey: this.mailchimp.apiKey,
          server: this.mailchimp.apiKey.split('-')[1]
        });

        // Create campaign
        const campaignResponse = await mailchimp.campaigns.create({
          type: 'regular',
          recipients: {
            list_id: this.mailchimp.listId
          },
          settings: {
            subject_line: campaign.subject,
            from_name: this.mailchimp.fromEmail,
            reply_to: this.mailchimp.fromEmail,
            html_content: campaign.content
          }
        });

        // Send campaign
        await mailchimp.campaigns.send(campaignResponse.id);

        return { success: true, sent: subscribers.length };
      } catch (error) {
        console.error('Mailchimp campaign error:', error);
        return { success: false, error: error.message };
      }
    }
  }
};

module.exports = emailService;
