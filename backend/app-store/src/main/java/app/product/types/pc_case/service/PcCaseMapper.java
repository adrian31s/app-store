package app.product.types.pc_case.service;

import app.product.types.pc_case.model.PcCase;
import app.product.types.pc_case.model.PcCaseDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface PcCaseMapper {
    PcCaseDTO mapToDTO(PcCase pcCase);
}
