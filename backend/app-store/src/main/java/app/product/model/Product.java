package app.product.model;

import adi.jpa.crud.model.BaseEntity;
import app.product.model.utill.ProductCategory;
import app.product.types.charger.model.Charger;
import app.product.types.cooler.model.Cooler;
import app.product.types.dram_memory.model.DRAMMemory;
import app.product.types.graphic_card.model.GraphicCard;
import app.product.types.hard_drive.model.HardDrive;
import app.product.types.motherboard.model.Motherboard;
import app.product.types.pc_case.model.PcCase;
import app.product.types.processor.model.Processor;
import app.single_product_order.model.ProductOrder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@ToString
@Getter
@Setter
public class Product extends BaseEntity {
    @Column(name = "CATEGORY")
    private ProductCategory productCategory;

    @Column(name = "NAME")
    private String name;

    @Column(name = "PRODUCER")
    private String producer;

    @Column(name = "GUARANTEE")
    private String guarantee;

    @Column(name = "MODEL")
    private String model;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "QUANTITY")
    private int quantity;

    @OneToMany(mappedBy = "product")
    private Set<ProductOrder> productOrders = new HashSet<>();

    //PRODUCTS TYPES
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "charger_id", referencedColumnName = "BID")
    private Charger charger;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cooler_id", referencedColumnName = "BID")
    private Cooler cooler;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "drammemory_id", referencedColumnName = "BID")
    private DRAMMemory dramMemory;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "graphic_card_id", referencedColumnName = "BID")
    private GraphicCard graphicCard;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "harddrive_id", referencedColumnName = "BID")
    private HardDrive hardDrive;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "motherboard_id", referencedColumnName = "BID")
    private Motherboard motherboard;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pc_case_id", referencedColumnName = "BID")
    private PcCase pcCase;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "processor_id", referencedColumnName = "BID")
    private Processor processor;

}
