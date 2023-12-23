package app.email.service;

import app.sharedServices.ReadFromFileService;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class EmailService {
    private final Mailer mailer;
    private final ReadFromFileService rffs;

    @Inject
    public EmailService(Mailer mailer, ReadFromFileService rffs) {
        this.mailer = mailer;
        this.rffs = rffs;
    }

    public void sendEmailForgotPassword(String password, String email) {
        String content = rffs.loadFileFromResources("forgotten_password.html");
        content = content.replace("%password%", password);

        Mail mail = new Mail();
        mail.setTo(List.of(email));
        mail.setHtml(content);
        mail.setSubject("NOWO WYGENEROWANE HASLO - KUPSPRZECIK.PL");
        mailer.send(mail);
    }
}
