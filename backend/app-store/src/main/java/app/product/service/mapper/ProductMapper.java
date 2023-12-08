package app.product.service.mapper;

import app.opinion.rs.v1.dto.OpinionMapper;
import app.product.model.Product;
import app.product.model.ProductDTO;
import app.product.model.ProductSearchCriteria;
import app.product.types.charger.service.ChargerMapper;
import app.product.types.cooler.service.CoolerMapper;
import app.product.types.dram_memory.service.DRAMMemoryMapper;
import app.product.types.graphic_card.service.GraphicCardMapper;
import app.product.types.hard_drive.service.HardDriveMapper;
import app.product.types.motherboard.service.MotherboardMapper;
import app.product.types.pc_case.service.PcCaseMapper;
import app.product.types.processor.service.ProcessorMapper;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {ChargerMapper.class, CoolerMapper.class, DRAMMemoryMapper.class, GraphicCardMapper.class,
                HardDriveMapper.class, MotherboardMapper.class, PcCaseMapper.class, ProcessorMapper.class, OpinionMapper.class})
public interface ProductMapper {
    Product mapToProduct (ProductSearchCriteria searchCriteria);
    ProductSearchCriteria mapToSearchCriteria (Product product);

    ProductDTO mapToDTO(Product product);
    List<ProductDTO> mapToListDTO(List<Product> products);
}
