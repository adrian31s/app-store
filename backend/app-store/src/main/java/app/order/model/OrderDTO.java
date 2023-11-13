package app.order.model;

import app.order.model.utill.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderDTO {
    private Long bid;
    private Date ordered;
    private Date delivered;
    private Status status;
    private Double totalPrice;
    private Long bucketId;

}
