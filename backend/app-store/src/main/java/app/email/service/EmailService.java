package app.email.service;

import app.sharedServices.ReadFromFileService;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.HashMap;
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
        content = content.replaceFirst("%password%", password);

        Mail mail = new Mail();
        mail.setTo(List.of(email));
        mail.setHtml(content);
        mail.setSubject("NOWO WYGENEROWANE HASLO - KUPSPRZECIK.PL");
        mailer.send(mail);
    }

    public void sendEmailFinalizePurchase(String email, HashMap<String,String> params) {
        String content = rffs.loadFileFromResources("finalize_purchase.html");
        content = content
                .replaceFirst("%li_products_li%", params.get("products"))
                .replaceFirst("%order_id%", params.get("orderId"))
                .replaceFirst("%apartment_number%", params.get("apartmentNumber"))
                .replaceFirst("%building_number%", params.get("buildingNumber"))
                .replaceFirst("%province%", params.get("province"))
                .replaceFirst("%zip_code%", params.get("zipCode"))
                .replaceFirst("%city%", params.get("city"))
                .replaceFirst("%price%", params.get("price"));

        Mail mail = new Mail();
        mail.setTo(List.of(email));
        mail.setHtml(content);
        mail.setSubject("Dziekujemy za zakup - KUPSPRZECIK.PL");
        mailer.send(mail);
    }
}
