package app.product.types.processor.service;

import app.product.types.processor.model.Processor;
import app.product.types.processor.model.ProcessorDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface ProcessorMapper {
    ProcessorDTO mapToDTO(Processor processor);
}
