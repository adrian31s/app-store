package app.product.model;

import app.product.model.utill.ProductCategory;
import app.product.types.charger.model.ChargerDTO;
import app.product.types.cooler.model.CoolerDTO;
import app.product.types.dram_memory.model.DRAMMemoryDTO;
import app.product.types.graphic_card.model.GraphicCardDTO;
import app.product.types.hard_drive.model.HardDriveDTO;
import app.product.types.motherboard.model.MotherboardDTO;
import app.product.types.pc_case.model.PcCaseDTO;
import app.product.types.processor.model.ProcessorDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long bid;
    private String thumbnail;
    private String pictures;
    private ProductCategory productCategory;
    private String name;
    private String producer;
    private String guarantee;
    private String model;
    private Double price;
    private int quantity;

    private ChargerDTO charger;
    private CoolerDTO cooler;
    private DRAMMemoryDTO dramMemory;
    private GraphicCardDTO graphicCard;
    private HardDriveDTO hardDrive;
    private MotherboardDTO motherboard;
    private PcCaseDTO pcCase;
    private ProcessorDTO processor;
}
