using CloudMedicApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace CloudMedicApi.Utility
{
    public class MailSender
    {
        public SmtpClient client;
        public MailMessage mail;

        public MailSender()
        {
            client = new SmtpClient("mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("41804b9c906d7715c", "87b6185db5ed98"),
                EnableSsl = true
            };
            mail = new MailMessage();
            mail.From = new MailAddress("crypterondummytest@outlook.com", "no_reply_cloudmedic");
        }

        /** 
        * SendInvite() - sends an invite to a generated user with a specified body message
        */
        public void SendInvite(string message, string address)
        {
            mail.To.Add(new MailAddress(address));
            mail.Subject = "Invitation to join CloudMedic";
            mail.Body = message;
            client.Send(mail);
        }
    }
}