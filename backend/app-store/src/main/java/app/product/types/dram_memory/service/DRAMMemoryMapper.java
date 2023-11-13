package app.product.types.dram_memory.service;

import app.product.types.dram_memory.model.DRAMMemory;
import app.product.types.dram_memory.model.DRAMMemoryDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface DRAMMemoryMapper {
    DRAMMemoryDTO mapToDTO(DRAMMemory dramMemory);
}
