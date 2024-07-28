package app.common.base.model;

import javax.persistence.*;

@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Column(
            name = "BID"
    )
    private Long bid;

    public BaseEntity() {
    }

    public abstract String toString();

    public Long getBid() {
        return this.bid;
    }

}